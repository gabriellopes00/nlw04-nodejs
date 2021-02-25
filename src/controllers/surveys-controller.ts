import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../database/repositories/surveys'

export class SurveysController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body
    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({ title, description })
    await surveysRepository.save(survey)

    return res.status(201).json({ survey })
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveys = await surveysRepository.find()
    return res.json({ surveys })
  }
}
