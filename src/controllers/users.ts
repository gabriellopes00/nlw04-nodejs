import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { UsersModel } from '../database/models/users'

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const usersRepository = getRepository(UsersModel)

    const userAlreadyExists = await usersRepository.findOne({ email })
    if (userAlreadyExists) {
      return res.status(409).json({ message: 'Received email already in use' })
    }

    const user = usersRepository.create({ name, email })
    await usersRepository.save(user)

    return res.sendStatus(200)
  }
}
