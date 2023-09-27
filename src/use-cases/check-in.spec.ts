
import { expect, describe, it, beforeEach } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'




// cria o tete sem usar o prisma, salva em array.

describe('Check-in Use Case', () => {

  let checkInsRepository: InMemoryCheckInsRepository
  let sut: CheckInUseCase

  beforeEach(() => {

    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new CheckInUseCase(checkInsRepository)

  })


  it('should be able to check in', async () => {



    const { checkIn } = await sut.execute({

      gymId: 'gym-01',
      userId: 'user-01'
    })


    expect(checkIn.id).toEqual(expect.any(String))
  })






})