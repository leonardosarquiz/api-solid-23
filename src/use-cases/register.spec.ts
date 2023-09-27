
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'



// cria o tete sem usar o prisma, salva em array.

describe('Register Use Case', () => {


  it('should be able to register', async () => {


    const usersRepository = new InMemoryUserRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)





    const { user } = await registerUseCase.execute({
      nome: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '1234567'
    })


    expect(user.id).toEqual(expect.any(String))
  })





  it('should hash user password upon registration', async () => {


    const usersRepository = new InMemoryUserRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)





    const { user } = await registerUseCase.execute({
      nome: 'John Doe',
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


    const usersRepository = new InMemoryUserRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)



    const email = 'johdoe@gmail.com'

    await registerUseCase.execute({
      nome: 'John Doe',
      email,
      password: '1234567'
    }),



      await expect(() =>
        registerUseCase.execute({
          nome: 'John Doe',
          email,
          password: '1234567'
        })).rejects.toBeInstanceOf(UserAlredyExistsError)
  })




})