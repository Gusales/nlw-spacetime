import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const { sub } = request.user

    const memories = await prisma.memory.findMany({
      where: {
        userId: sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverURL: memory.coverURL,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    const { sub } = request.user

    if (!memory.isPublic && memory.userId !== sub) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      coverURL: z.string().url(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    console.log(request.body)
    const { content, coverURL, isPublic } = bodySchema.parse(request.body)
    const { sub } = request.user
    const memory = await prisma.memory.create({
      data: {
        content,
        coverURL,
        isPublic,
        userId: sub,
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      coverURL: z.string().url(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverURL, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    const { sub } = request.user

    if (memory.userId !== sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverURL,
        isPublic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    const { sub } = request.user

    if (memory.userId !== sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
