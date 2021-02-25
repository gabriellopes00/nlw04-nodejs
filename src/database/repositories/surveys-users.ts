import { EntityRepository, Repository } from 'typeorm'
import { SurveysUsersModel } from '../models/surveys-users'

@EntityRepository(SurveysUsersModel)
export class SurveysUsersRepository extends Repository<SurveysUsersModel> {}
