
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'



// cria o tete sem usar o prisma, salva em array.

describe('Register Use Case', () => {


  let usersRepository: InMemoryUserRepository
  let sut: RegisterUseCase


  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()

    sut = new RegisterUseCase(usersRepository)

  })

  it('should be able to register', async () => {


    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '1234567'
    })


    expect(user.id).toEqual(expect.any(String))
  })





  it('should hash user password upon registration', async () => {




    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '1234567'
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })




  it('should not be able to register with same email twice', async () => {





    const email = 'johdoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1234567'
    }),



      await expect(() =>
        sut.execute({
          name: 'John Doe',
          email,
          password: '1234567'
        })).rejects.toBeInstanceOf(UserAlredyExistsError)
  })




})