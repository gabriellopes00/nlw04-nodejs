import { HttpErrors } from '../errors/http-errors'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'
import { UsersRepository } from '../database/repositories/users'

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const usersRepository = getCustomRepository(UsersRepository)

    const isValidData = await yup
      .object()
      .shape({
        name: yup.string().required(),
        email: yup.string().required().email()
      })
      .isValid(req.body)

    if (!isValidData) throw new HttpErrors('Validation failed', 400)

    const userAlreadyExists = await usersRepository.findOne({ email })
    if (userAlreadyExists) {
      throw new HttpErrors('Received email already in use', 409)
    }

    const user = usersRepository.create({ name, email })
    await usersRepository.save(user)

    return res.status(201).json({ user })
  }
}
