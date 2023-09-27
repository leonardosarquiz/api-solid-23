/* eslint-disable prettier/prettier */
import { error } from 'console'
import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, nome, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)

    if (userWithSomeEmail) {
      throw new UserAlredyExistsError()
    }




    const user = await this.usersRepository.create({
      nome,
      email,
      password_hash
    })

    return {
      user,
    }
  }
}


