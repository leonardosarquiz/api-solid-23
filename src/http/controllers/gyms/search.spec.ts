import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/creaate-and-authenticate-user'


describe('search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

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
        nome: 'Typescript Gym', description: 'Some description', phone: '123456789', latitude: -29.6737,
        longitude: -51.1288119,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Javascript' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ nome: 'Javascript Gym' })
    ])

  })
})