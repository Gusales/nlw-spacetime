import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRotes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)
    console.log('user code' + code)

    const acessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        headers: {
          Accept: 'application/json',
        },
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
      },
    )
    const { access_token } = acessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatarURL: userInfo.avatar_url,
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
        },
      })
    }

    const token = app.jwt.sign(
      { name: user.name, avatarUrl: user.avatarURL },
      { sub: user.id, expiresIn: '30 days' },
    )

    console.log(token)

    return { token }
  })
}
