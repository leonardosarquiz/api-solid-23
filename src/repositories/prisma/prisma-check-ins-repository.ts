import { ChechkIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.chechkIn.findUnique({
      where: {
        id
      }
    })
    return checkIn
  }
  async create(data: Prisma.ChechkInUncheckedCreateInput) {
    const checkIn = await prisma.chechkIn.create({
      data,
    })
    return checkIn
  }
  async findManyByUserId(useriD: string, page: number) {
    const checkInd = await prisma.chechkIn.findMany({
      where: {
        user_id: useriD
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkInd
  }
  async countByUserId(uuserId: string) {
    const count = await prisma.chechkIn.count({
      where: {
        user_id: uuserId
      }
    })
    return count
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.chechkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        }
      }
    })
    return checkIn
  }
  async save(data: ChechkIn) {
    const checkIn = await prisma.chechkIn.update({
      where: {
        id: data.id
      },
      data
    })
    return checkIn
  }

}
