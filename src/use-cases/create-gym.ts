/* eslint-disable prettier/prettier */


import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  nome: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {

  constructor(private gymsRepository: GymsRepository) { }

  async execute({ nome, phone, longitude, latitude, description }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({
      nome, phone, longitude, latitude, description
    })

    return {
      gym,
    }
  }
}


