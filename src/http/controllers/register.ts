/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '../../use-cases/register'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UserAlredyExistsError } from '../../use-cases/errors/user-alredy-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = registerBodySchema.parse(request.body)


  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUsecase = new RegisterUseCase(prismaUserRepository)
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
