
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { ValidateUseCase } from './validate-check-in'
import { ResourceNotFounError } from './errors/resource-not-found-error'






// cria o tete sem usar o prisma, salva em array.

describe('Validate Check-in Use Case', () => {

  let checkInsRepository: InMemoryCheckInsRepository

  let sut: ValidateUseCase

  beforeEach(async () => {

    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new ValidateUseCase(checkInsRepository)





    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to validate the check in', async () => {

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })


    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })


    expect(checkIn.validate_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validate_at).toEqual(expect.any(Date))
  })


  it('should not be able to validate an inexistent check in', async () => {





    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFounError)
  })


  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))


    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)
  })



})