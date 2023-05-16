import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const app = fastify()
const port = process.env.PORT ? Number(process.env.PORT) : 3333
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(
      `Backend for NLW Spacetime is running 🚀. URL: http://localhost:${port}/`,
    )
  })
