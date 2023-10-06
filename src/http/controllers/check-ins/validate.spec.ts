import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creaate-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Validate check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()


    const gym = await prisma.gym.create({
      data: {
        nome: 'Javascript Gym',
        latitude: -29.6737,
        longitude: -51.1288119,
      }
    })

    let checkIn = await prisma.chechkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })


    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)


    checkIn = await prisma.chechkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })


    expect(checkIn.validate_at).toEqual(expect.any(Date))
  })
})