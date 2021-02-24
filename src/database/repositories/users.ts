import { EntityRepository, Repository } from 'typeorm'
import { UsersModel } from '../models/users'

@EntityRepository(UsersModel)
export class UsersRepository extends Repository<UsersModel> {}
