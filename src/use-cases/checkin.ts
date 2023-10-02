
import { ChechkIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { GymsRepository } from "../repositories/gyms-repository"
import { ResourceNotFounError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "..//utils/get-distance-between-cordinates";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";


interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: ChechkIn
}


export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository, private gymRepository: GymsRepository) {

  }

  async execute({ gymId, userId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFounError()
    }

    const distance = getDistanceBetweenCoordinates({
      latitude: userLatitude, longitude: userLongitude
    },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId

    })

    return {
      checkIn,
    }
  }
}