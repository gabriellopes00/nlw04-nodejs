import { Router } from 'express'
import { NpsController } from './controllers/nps-controller'
import { SurveysController } from './controllers/surveys-controller'
import { SendMailController } from './controllers/surveys-users-controller'
import { AnswerController } from './controllers/users-answer-controller'
import { UsersController } from './controllers/users-controller'

const usersController = new UsersController()
const surveysController = new SurveysController()
const answersController = new AnswerController()
const npsController = new NpsController()
const sendMailController = new SendMailController()

const router = Router()

router.post('/users', usersController.create)
router.get('/answers/:value', answersController.answer)
router.get('/nps/:survey_id', npsController.calc)

router.post('/surveys-users', sendMailController.handle)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.listAll)

export { router }
