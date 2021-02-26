import { SurveysUsersRepository } from '../database/repositories/surveys-users'
import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'

export class NpsController {
  async calc(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const totalAnswers = surveysUsers.length
    const detractors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length
    const promoters = surveysUsers.filter(survey => survey.value >= 9).length
    const passives = surveysUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    )
    return res.json({
      nps: { detractors, promoters, passives, totalAnswers, nps }
    })
  }
}
