/* eslint-disable prettier/prettier */
import { error } from 'console'
import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

export async function registerUseCase({ email, nome, password }: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSomeEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSomeEmail) {
    throw new Error('E-mail alredy exists.')
  }


  const prismaUsersRepository = new PrismaUsersRepository()


  prismaUsersRepository.create({
    email,
    nome,
    password_hash
  })


}
