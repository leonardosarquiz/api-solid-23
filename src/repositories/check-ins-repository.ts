import { ChechkIn, Prisma, } from "@prisma/client";


export interface CheckInsRepository {
  create(data: Prisma.ChechkInUncheckedCreateInput): Promise<ChechkIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<ChechkIn | null>
}

