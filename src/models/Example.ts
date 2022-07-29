import { Entity, type IEntity } from '@/models/Entity'

export interface IExample extends IEntity {
  name: string
  description: string
  // rounds: any[]
}

export class Example extends Entity {
  name: string
  description: string
  // rounds: any[]

  constructor(params: IExample) {
    super({ id: params.id, createdDate: params.createdDate })
    this.name = params.name
    this.description = params.description
    // this.rounds = params.rounds
  }
}
