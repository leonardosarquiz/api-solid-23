/* eslint-disable prettier/prettier */
import { error } from 'console'
import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, nome, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSomeEmail) {
      throw new UserAlredyExistsError()
    }


    // const prismaUsersRepository = new PrismaUsersRepository()


    this.usersRepository.create({
      nome,
      email,
      password_hash
    })


  }
}


