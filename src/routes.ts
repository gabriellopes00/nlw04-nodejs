import { Router } from 'express'
import { UsersController } from './controllers/users'

const usersController = new UsersController()

const router = Router()

router.post('/users', usersController.create)

export { router }
