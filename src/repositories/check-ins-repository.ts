import { ChechkIn, Prisma, } from "@prisma/client";


export interface CheckInsRepository {
  findById(id: string): Promise<ChechkIn | null>
  create(data: Prisma.ChechkInUncheckedCreateInput): Promise<ChechkIn>
  findManyByUserId(useriD: string, page: number): Promise<ChechkIn[]>
  countByUserId(uuserId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<ChechkIn | null>
  save(checkIn: ChechkIn): Promise<ChechkIn>
}

