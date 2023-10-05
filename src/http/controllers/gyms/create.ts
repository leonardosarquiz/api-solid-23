/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    nome: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { description, latitude, longitude, phone, nome } = createGymBodySchema.parse(request.body)



  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({
    description, latitude, longitude, phone, nome
  })




  return reply.status(201).send()
}
