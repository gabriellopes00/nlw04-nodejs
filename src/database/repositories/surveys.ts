import { EntityRepository, Repository } from 'typeorm'
import { SurveysModel } from '../models/surveys'

@EntityRepository(SurveysModel)
export class SurveysRepository extends Repository<SurveysModel> {}
