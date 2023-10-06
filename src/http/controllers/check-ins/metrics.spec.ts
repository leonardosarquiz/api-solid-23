import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creaate-and-authenticate-user'
import { prisma } from '@/lib/prisma'


describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to the total cout of check-ins', async () => {

    const { token } = await createAndAuthenticateUser(app)


    const user = await prisma.user.findFirstOrThrow()


    const gym = await prisma.gym.create({
      data: {
        nome: 'Javascript Gym',
        latitude: -29.6737,
        longitude: -51.1288119,
      }
    })

    await prisma.chechkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        }, {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)

  })
})