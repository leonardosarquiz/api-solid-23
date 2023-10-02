



import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'






// cria o tete sem usar o prisma, salva em array.

describe('Fetch Nearby Gyms Use Case', () => {

  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearByGymsUseCase

  beforeEach(async () => {

    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)


  })




  it('should be able to fetch nearby gyms', async () => {


    await gymsRepository.create({
      nome: 'Near Gym',
      latitude: -29.6737,
      longitude: -51.1288119,
      description: null,
      phone: null,

    })

    await gymsRepository.create({
      nome: 'Far gym',
      latitude: -29.4766615,
      longitude: -54.5814492,
      description: null,
      phone: null,

    })



    const { gyms } = await sut.execute({

      userLatitude: -29.6737,
      userLongitude: -51.1288119,

    })


    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ nome: 'Near Gym' }),

    ])

  })



})