



import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-users-check-ins-history'
import { GetUserMetricUseCase } from './get-user-metrics'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'





// cria o tete sem usar o prisma, salva em array.

describe('Search Gyms Use Case', () => {

  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymUseCase

  beforeEach(async () => {

    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)


  })




  it('should be able to search for gyms', async () => {


    await gymsRepository.create({
      nome: 'JavaScript Gym',
      latitude: -29.6737,
      longitude: -51.1288119,
      description: null,
      phone: null,

    })

    await gymsRepository.create({
      nome: 'Typescript Gyms',
      latitude: -29.6737,
      longitude: -51.1288119,
      description: null,
      phone: null,

    })



    const { gyms } = await sut.execute({

      query: 'JavaScript',
      page: 1

    })


    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ nome: 'JavaScript Gym' }),

    ])

  })







  it('should be able to fetch pagined gyms search', async () => {


    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        nome: `Typescript Gyms ${i}`,
        latitude: -29.6737,
        longitude: -51.1288119,
        description: null,
        phone: null,
      })


    }



    const { gyms } = await sut.execute({

      query: 'Typescript',
      page: 2,
    })


    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      [
        expect.objectContaining({ nome: 'Typescript Gyms 21' }),
        expect.objectContaining({ nome: 'Typescript Gyms 22' }),
      ]
    )
  })






})