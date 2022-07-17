import { Entity, type IEntity } from '@/models/Entity'

export interface IExampleRecord extends IEntity {
  parentId: string
  value: number
}

export class ExampleRecord extends Entity {
  parentId: string
  value: number

  constructor(params: IExampleRecord) {
    super({ id: params.id, createdDate: params.createdDate })
    this.parentId = params.parentId
    this.value = params.value
  }
}
