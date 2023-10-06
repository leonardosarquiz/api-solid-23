/* eslint-disable prettier/prettier */
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { gymRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'






export const app = fastify()

app.register(require('@fastify/jwt'), {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: 'Validation error', issues: error.format })
  }

  if (env.NODE_ENV != 'production') {
    console.log(error)
  } else {

  }

  return reply.status(500).send({ error: 'Internal server error.' })
})
