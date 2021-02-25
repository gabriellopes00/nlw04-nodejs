import supertest from 'supertest'
import { app } from '../app'
import { PsQLConnectionManager } from '../database/connection'
import { SurveysRepository } from '../database/repositories/surveys'

describe('Surveys Controller', () => {
  const psqlConnection = new PsQLConnectionManager()
  const request = supertest(app)

  beforeAll(async () => await psqlConnection.connect())
  afterAll(async () => await psqlConnection.close())

  beforeEach(async () => {
    const repository = psqlConnection.getCustomRepository(SurveysRepository)
    repository.delete({})
  })

  const fakeSurvey = { title: 'Fake Survey', description: 'lorem ipsum...' }

  it('Should create a survey on POST:/surveys success', async () => {
    const response = await request.post('/surveys').send(fakeSurvey)
    expect(response.status).toBe(201)
    expect(response.body.survey).toHaveProperty('id')
  })

  it('Should return all surveys on GET:/surveys success', async () => {
    await request.post('/surveys').send(fakeSurvey)
    const response = await request.get('/surveys')
    expect(response.status).toBe(200)
    expect(response.body.surveys[0]).toEqual(
      expect.objectContaining(fakeSurvey)
    )
  })
})
