import 'dotenv/config'

import fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { resolve } from 'node:path'
import { authRotes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

const app = fastify()
const port = process.env.PORT ? Number(process.env.PORT) : 3333
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'spacetime'

app.register(cors, {
  origin: true,
})

app.register(multipart)

app.register(jwt, {
  secret,
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(authRotes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    host: '0.0.0.0',
    port,
  })
  .then(() => {
    console.log(
      `Backend for NLW Spacetime is running 🚀. URL: http://localhost:${port}/`,
    )
  })
