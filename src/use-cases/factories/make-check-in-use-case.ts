import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GymsPrismaRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../checkin"



export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const gymsRepository = new GymsPrismaRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}