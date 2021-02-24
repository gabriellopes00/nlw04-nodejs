import { Router } from 'express'
import { SurveysController } from './controllers/surveys-controller'
import { UsersController } from './controllers/users-controller'

const usersController = new UsersController()
const surveysController = new SurveysController()

const router = Router()

router.post('/users', usersController.create)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.listAll)

export { router }
