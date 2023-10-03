import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"

import { GetUserMetricUseCase } from "../get-user-metrics"



export function makeUsersMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricUseCase(checkInsRepository)

  return useCase
}