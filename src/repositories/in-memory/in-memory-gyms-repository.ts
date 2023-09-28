import { Gym, Prisma } from "@prisma/client";

import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {


  public items: Gym[] = []




  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }



  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      nome: data.nome,
      description: data.description ?? null,
      phone: data.Phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString())


    }

    this.items.push(gym)

    return gym
  }




}