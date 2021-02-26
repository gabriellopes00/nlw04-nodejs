import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../database/repositories/surveys'
import { SurveysUsersRepository } from '../database/repositories/surveys-users'
import { UsersRepository } from '../database/repositories/users'
import mailService from '../services/mail-service'

export class SendMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, surveyId } = req.body

    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const existentUser = await usersRepository.findOne({ email })
    if (!existentUser)
      return res.status(401).json({ message: 'User not found' })

    const existentSurvey = await surveysRepository.findOne({ id: surveyId })
    if (!existentSurvey)
      return res.status(400).json({ message: 'Survey not exists' })

    const existentSurveysUsers = await surveysUsersRepository.findOne({
      where: { user_id: existentUser.id, value: null },
      relations: ['users', 'surveys']
    })

    const mailVariables = {
      name: existentUser.name,
      title: existentSurvey.title,
      description: existentSurvey.description,
      link: process.env.MAIL_URL,
      id: ''
    }

    const path = resolve(__dirname, '..', 'views', 'templates', 'nps-mail.hbs')
    if (existentSurveysUsers) {
      mailVariables.id = existentSurveysUsers.id
      mailService.send(email, existentSurvey.title, mailVariables, path)
    }

    const surveysUser = surveysUsersRepository.create({
      user_id: existentUser.id,
      survey_id: surveyId
    })
    await surveysUsersRepository.save(surveysUser)

    mailVariables.id = surveysUser.id
    mailService.send(email, existentSurvey.title, mailVariables, path)
    return res.json({ existentSurveysUsers })
  }
}
