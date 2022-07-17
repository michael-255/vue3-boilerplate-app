// import { DateTime } from 'luxon'

export interface IEntity {
  id: string
  createdDate: string
}

/**
 * _Entity Class
 * @param params IEntity
 */
export class Entity {
  id: string
  createdDate: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdDate = params.createdDate
  }

  // getReadableCreatedAt(): string {
  //   return DateTime.fromISO(this.createdDate).toFormat('ccc LLL d yyyy ttt')
  // }
}
