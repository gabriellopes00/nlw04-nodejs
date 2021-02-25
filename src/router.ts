import { Router } from 'express'
import { SurveysController } from './controllers/surveys-controller'
import { SendMailController } from './controllers/surveys-users-controller'
import { UsersController } from './controllers/users-controller'

const usersController = new UsersController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()

const router = Router()

router.post('/users', usersController.create)

router.post('/surveys-users', sendMailController.handle)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.listAll)

export { router }
