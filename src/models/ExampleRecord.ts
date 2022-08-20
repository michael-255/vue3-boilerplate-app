import { _Entity, type IEntity } from '@/models/_Entity'

export type Round = {
  primary?: number
  secondary?: number
}

export interface IExampleRecord extends IEntity {
  parentId: string
  number: number
  rounds: Round[]
}

/**
 * Example Record Class
 * @param params IExampleRecord
 */
export class ExampleRecord extends _Entity {
  parentId: string
  number: number
  rounds: Round[]

  constructor(params: IExampleRecord) {
    super({ id: params.id, createdDate: params.createdDate })
    this.parentId = params.parentId
    this.number = params.number
    this.rounds = params.rounds
  }
}
