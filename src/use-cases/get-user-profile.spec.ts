
import { expect, describe, it, beforeEach } from 'vitest'

import { compare, hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFounError } from './errors/resource-not-found-error'



// cria o tete sem usar o prisma, salva em array.

describe('Get User Profile Use Case', () => {

  let usersRepository: InMemoryUserRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {

    usersRepository = new InMemoryUserRepository()

    sut = new GetUserProfileUseCase(usersRepository)

  })


  it('should be able to get user profile', async () => {




    const createdUser = await usersRepository.create({
      nome: 'John Doe',
      email: 'johdoe@gmail.com',
      password_hash: await hash('123456', 6)
    })



    const { user } = await sut.execute({

      userId: createdUser.id
    })



    expect(user.nome).toEqual('John Doe')
  })



  it('should not be able to get user profile with wrong id', async () => {


    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFounError)




  })


})