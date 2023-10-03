
import { SearchGymUseCase } from "../search-gyms"
import { GymsPrismaRepository } from "@/repositories/prisma/prisma-gyms-repository"



export function makeSearchGymsUseCase() {
  const gymPrismaRepository = new GymsPrismaRepository()
  const useCase = new SearchGymUseCase(gymPrismaRepository)

  return useCase
}