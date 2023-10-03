
import { CreateGymUseCase } from "../create-gym"
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms"
import { GymsPrismaRepository } from "@/repositories/prisma/prisma-gyms-repository"



export function makeCreateGymUseCase() {
  const gymsPrismaRepository = new GymsPrismaRepository()
  const useCase = new CreateGymUseCase(gymsPrismaRepository)

  return useCase
}