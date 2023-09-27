
import { expect, describe, it, beforeEach } from 'vitest'

import { compare, hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'



// cria o tete sem usar o prisma, salva em array.

describe('Authenticate Use Case', () => {

  let usersRepository: InMemoryUserRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {

    usersRepository = new InMemoryUserRepository()

    sut = new AuthenticateUseCase(usersRepository)

  })


  it('should be able to authenticate', async () => {




    await usersRepository.create({
      nome: 'John Doe',
      email: 'johdoe@gmail.com',
      password_hash: await hash('123456', 6)
    })



    const { user } = await sut.execute({

      email: 'johdoe@gmail.com',
      password: '123456'
    })


    expect(user.id).toEqual(expect.any(String))
  })



  it('should not be able to authenticate with wrong email', async () => {







    await expect(() => sut.execute({
      email: 'johdoe@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialError)




  })




  it('should not be able to authenticate with wrong password', async () => {




    await usersRepository.create({
      nome: 'John Doe',
      email: 'johdoe@gmail.com',
      password_hash: await hash('123456', 6)
    })




    await expect(() => sut.execute({
      email: 'johdoe@gmail.com',
      password: '12349678'
    })).rejects.toBeInstanceOf(InvalidCredentialError)




  })








})