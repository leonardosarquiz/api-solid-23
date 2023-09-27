import { ChechkIn, Prisma, } from "@prisma/client";


export interface CheckInsRepository {
  create(data: Prisma.ChechkInUncheckedCreateInput): Promise<ChechkIn>
}

