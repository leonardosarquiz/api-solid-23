
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'





// cria o tete sem usar o prisma, salva em array.

describe('Create Gym Use Case', () => {


  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase


  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new CreateGymUseCase(gymsRepository)

  })

  it('should be able to create gym', async () => {


    const { gym } = await sut.execute({

      nome: 'Javascript gym',
      latitude: -29.6737,
      longitude: -51.1288119,
      description: null,
      phone: null,

    })


    expect(gym.id).toEqual(expect.any(String))
  })







})