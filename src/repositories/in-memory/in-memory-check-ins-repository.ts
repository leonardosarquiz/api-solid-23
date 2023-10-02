import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ChechkIn, Prisma, } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

export class InMemoryCheckInsRepository implements CheckInsRepository {


  public items: ChechkIn[] = []




  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    dayjs.extend(isSameOrAfter)

    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')


    const checkOnSameDate = this.items.find((checkIn) => {
      const checkIndate = dayjs(checkIn.created_at)

      const isOnSameDate = checkIndate.isSameOrAfter(startOfTheDay) && checkIndate.isBefore(endOfTheDay)
      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }
    return checkOnSameDate
  }



  async findManyByUserId(useriD: string, page: number) {
    return this.items.filter((item) => item.user_id === useriD)
      .slice((page - 1) * 20, page * 20)
  }


  async countByUserId(useriD: string) {
    return this.items.filter((item) => item.user_id === useriD)
      .length
  }

  async create(data: Prisma.ChechkInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validate_at: data.validate_at ? new Date(data.validate_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: ChechkIn) {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}