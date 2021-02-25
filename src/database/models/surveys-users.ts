import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { SurveysModel } from './surveys'
import { UsersModel } from './users'

@Entity('surveys_users')
export class SurveysUsersModel {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @ManyToOne(() => UsersModel)
  @JoinColumn({ name: 'user_id' })
  users: UsersModel

  @Column()
  survey_id: string

  @ManyToOne(() => SurveysModel)
  @JoinColumn({ name: 'survey_id' })
  surveys: SurveysModel

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
