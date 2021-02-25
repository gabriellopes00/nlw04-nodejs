import supertest from 'supertest'
import { app } from '../app'
import { PsQLConnectionManager } from '../database/connection'
import { UsersRepository } from '../database/repositories/users'

describe('Users Controller', () => {
  const psqlConnection = new PsQLConnectionManager()
  const request = supertest(app)

  beforeAll(async () => await psqlConnection.connect())
  afterAll(async () => await psqlConnection.close())

  beforeEach(async () => {
    const repository = psqlConnection.getCustomRepository(UsersRepository)
    repository.delete({})
  })

  const fakeUser = { name: 'Gabriel', email: 'gabriel@mail.com' }

  it('Should create a user on POST:/users success', async () => {
    const response = await request.post('/users').send(fakeUser)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({ user: expect.objectContaining(fakeUser) })
  })

  it('Should return 409 (conflict) on POST:/users if provided email is already in use', async () => {
    await request.post('/users').send(fakeUser)
    const response = await request.post('/users').send(fakeUser)

    expect(response.status).toBe(409)
    expect(response.body).toEqual({ message: 'Received email already in use' })
  })
})
