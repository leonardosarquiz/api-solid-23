/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlredyExistsError } from '../../use-cases/errors/user-alredy-exists-error'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = registerBodySchema.parse(request.body)


  try {
    const registerUsecase = makeRegisterUseCase()
    await registerUsecase.execute({
      nome,
      email,
      password
    })
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }



  return reply.status(201).send()
}
