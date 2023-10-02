



import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-users-check-ins-history'
import { GetUserMetricUseCase } from './get-user-metrics'





// cria o tete sem usar o prisma, salva em array.

describe('Get User Metric Use Case', () => {

  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricUseCase

  beforeEach(async () => {

    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricUseCase(checkInsRepository)


  })




  it('should be able to get check-ins count from metrics', async () => {


    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })



    const { checkInsCount } = await sut.execute({

      userId: 'user-01',

    })


    expect(checkInsCount).toEqual(2)

  })






})