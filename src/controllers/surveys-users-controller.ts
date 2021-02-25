import { SurveysRepository } from '../database/repositories/surveys'
import { UsersRepository } from '../database/repositories/users'
import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { SurveysUsersRepository } from '../database/repositories/surveys-users'
import mailService from '../services/mail-service'
import { resolve } from 'path'

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
      where: [{ user_id: existentUser.id }, { value: null }],
      relations: ['users', 'surveys']
    })
    const mailVariables = {
      name: existentUser.name,
      title: existentSurvey.title,
      description: existentSurvey.description,
      link: process.env.MAIL_URL,
      user_id: existentUser.id
    }
    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'templates',
      'nps-mail.hbs'
    )
    if (existentSurveysUsers)
      mailService.send(email, existentSurvey.title, mailVariables, templatePath)

    const surveysUser = surveysUsersRepository.create({
      user_id: existentUser.id,
      survey_id: surveyId
    })
    await surveysUsersRepository.save(surveysUser)

    mailService.send(
      email,
      existentSurvey.title,
      mailVariables,
      resolve(__dirname, '..', 'views', 'templates', 'nps-mail.hbs')
    )

    return res.json({ existentSurveysUsers })
  }
}
