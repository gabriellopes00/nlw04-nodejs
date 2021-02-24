import { SurveysRepository } from '../database/repositories/surveys'
import request from 'supertest'
import { app } from '../app'
import connection from '../database/connection'

describe('Users Controller', () => {
  const database = connection()
  beforeAll(async () => {
    await (await database).runMigrations()
  })

  beforeEach(async () => {
    const repository = (await database).getCustomRepository(SurveysRepository)
    repository.delete({})
  })

  const fakeSurvey = { title: 'Fake Survey', description: 'lorem ipsum...' }

  it('Should create a survey on POST:/surveys success', async () => {
    const response = await request(app).post('/surveys').send(fakeSurvey)
    expect(response.status).toBe(201)
    expect(response.body.survey).toHaveProperty('id')
  })

  it('Should return all surveys on GET:/surveys success', async () => {
    await request(app).post('/surveys').send(fakeSurvey)
    const response = await request(app).get('/surveys')
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.surveys[0]).toEqual(
      expect.objectContaining(fakeSurvey)
    )
  })
})
