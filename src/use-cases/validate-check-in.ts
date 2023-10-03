
import { ChechkIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFounError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";



interface ValidateCheckInUseCaseRequest {

  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: ChechkIn
}


export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {

  }

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFounError()
    }

    // diferença entre agora para data do check-in

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }


    checkIn.validate_at = new Date()


    await this.checkInsRepository.save(checkIn)


    return {
      checkIn,
    }
  }
}