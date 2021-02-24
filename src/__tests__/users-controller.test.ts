import request from 'supertest'
import { UsersRepository } from '../database/repositories/users'
import { app } from '../app'
import connection from '../database/connection'

describe('Users Controller', () => {
  const database = connection()
  beforeAll(async () => {
    await (await database).runMigrations()
  })

  beforeEach(async () => {
    const repository = (await database).getCustomRepository(UsersRepository)
    repository.delete({})
  })

  const fakeUser = { name: 'Gabriel', email: 'gabriel@mail.com' }

  it('Should create a user on POST:/users success', async () => {
    const response = await request(app).post('/users').send(fakeUser)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({ user: expect.objectContaining(fakeUser) })
  })

  it('Should return 409 (conflict) on POST:/users if provided email is already in use', async () => {
    await request(app).post('/users').send(fakeUser)
    const response = await request(app).post('/users').send(fakeUser)

    expect(response.status).toBe(409)
    expect(response.body).toEqual({ message: 'Received email already in use' })
  })
})
