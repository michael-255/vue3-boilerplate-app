import { _Entity, type IEntity } from '@/models/_Entity'

export interface IExample extends IEntity {
  name: string
  description: string
}

/**
 * Example Class
 * @param params IExample
 */
export class Example extends _Entity {
  name: string
  description: string

  constructor(params: IExample) {
    super({ id: params.id, createdDate: params.createdDate })
    this.name = params.name
    this.description = params.description
  }
}
