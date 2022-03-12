import { createId } from '../utils/build-id'

// Exports for LocalDatabase
export const UserStore = Object.freeze({ users: '&id, createdDate, name' })
export interface IUser {
  id: string
  createdDate: string
  name: string
  attributes: object
}

type UserParams = {
  id?: string
  createdDate?: string
  name?: string
  attributes?: object
}

export class User implements IUser {
  id: string
  createdDate: string
  name: string
  attributes: object

  constructor({
    id = createId(),
    createdDate = new Date().toISOString(),
    name = 'My User',
    attributes = {},
  }: UserParams = {}) {
    this.id = id
    this.createdDate = createdDate
    this.name = name
    this.attributes = attributes
  }

  getId() {
    return this.id
  }

  greeting() {
    return `Hello ${this.name}!`
  }

  displayCreatedDate() {
    return new Date(this.createdDate)
  }

  getAttributes() {
    return this.attributes
  }
}