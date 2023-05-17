import 'dotenv/config'

import fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRotes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const port = process.env.PORT ? Number(process.env.PORT) : 3333
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'spacetime'

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret,
})

app.register(memoriesRoutes)
app.register(authRotes)

app
  .listen({
    port,
  })
  .then(() => {
    console.log(
      `Backend for NLW Spacetime is running 🚀. URL: http://localhost:${port}/`,
    )
  })
