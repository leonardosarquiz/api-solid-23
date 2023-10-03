
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms"
import { GymsPrismaRepository } from "@/repositories/prisma/prisma-gyms-repository"



export function makeFetchNearbyGymsUseCase() {
  const gymsPrismaRepository = new GymsPrismaRepository()
  const useCase = new FetchNearByGymsUseCase(gymsPrismaRepository)

  return useCase
}