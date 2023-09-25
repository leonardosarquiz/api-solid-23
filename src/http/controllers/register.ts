/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const userWithSomeEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if (userWithSomeEmail) {
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      nome,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
