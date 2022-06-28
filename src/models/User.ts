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

/**
 * User class for Vue 3 Boilerplate app.
 * @param id
 * @param createdDate
 * @param name
 * @param attributes
 */
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

  getId(): string {
    return this.id
  }

  greeting(): string {
    return `Hello ${this.name}!`
  }

  getDate(): string {
    return this.createdDate
  }

  getAttributes(): object {
    return this.attributes
  }
}
