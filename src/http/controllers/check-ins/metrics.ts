/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeUsersMetricsUseCase } from '@/use-cases/factories/make-get-users-metric-use-case'

export async function metric(request: FastifyRequest, reply: FastifyReply) {


  const getUserMetricsUseCase = makeUsersMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,

  })




  return reply.status(200).send({ checkInsCount })
}
