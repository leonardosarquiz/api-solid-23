import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creaate-and-authenticate-user'


describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {

    const { token } = await createAndAuthenticateUser(app)


    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Javascript Gym', description: 'Some description', phone: '123456789', latitude: -29.6737,
        longitude: -51.1288119,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Typescript Gym', description: 'Some description', phone: '123456789', latitude: -29.4766615,
        longitude: -54.5814492,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -29.6737,
        longitude: -51.1288119,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ nome: 'Javascript Gym' })
    ])

  })
})