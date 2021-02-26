import { SurveysUsersRepository } from '../database/repositories/surveys-users'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

export class AnswerController {
  async answer(req: Request, res: Response): Promise<Response> {
    const { value } = req.params
    const { u } = req.query

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const existentSurveysUsers = await surveysUsersRepository.findOne({
      id: String(u)
    })

    if (!existentSurveysUsers)
      return res.status(400).json({ error: 'User not found' })

    existentSurveysUsers.value = Number(value)
    await surveysUsersRepository.save(existentSurveysUsers)
    return res.status(200).json({ existentSurveysUsers })
  }
}
