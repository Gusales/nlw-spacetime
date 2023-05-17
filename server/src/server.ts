import cors from '@fastify/cors'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
const port = process.env.PORT ? Number(process.env.PORT) : 3333

app.register(memoriesRoutes)
app.register(cors, {
  origin: true,
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
