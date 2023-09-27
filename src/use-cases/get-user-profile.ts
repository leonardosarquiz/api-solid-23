import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { ResourceNotFounError } from "./errors/resource-not-found-error";


interface GetUserProfieUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}


export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {

  }

  async execute({ userId }: GetUserProfieUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFounError()
    }


    return {
      user,
    }
  }
}