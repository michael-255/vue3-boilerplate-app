export interface IEntity {
  id: string
  createdDate: string
}

/**
 *_Entity Class
 * @param params IEntity
 */
export class _Entity {
  id: string
  createdDate: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdDate = params.createdDate
  }
}
