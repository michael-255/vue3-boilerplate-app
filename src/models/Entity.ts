export interface IEntity {
  id: string
  createdDate: string
}

/**
 * Entity Class
 * @param params IEntity
 */
export class Entity {
  id: string
  createdDate: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdDate = params.createdDate
  }
}
