import { createId } from '../utils/build-id'

// Exports for LocalDatabase
export const ExampleStore = Object.freeze({ examples: '&id, createdDate' })
export interface IExample {
  id: string
  createdDate: string
  data: object
}

type ExampleParams = {
  id?: string
  createdDate?: string
  data?: object
}

/**
 * Example class for Vue 3 Boilerplate app.
 * @param id
 * @param createdDate
 * @param data
 */
export class Example implements IExample {
  id: string
  createdDate: string
  data: object

  constructor({
    id = createId(),
    createdDate = new Date().toISOString(),
    data = {},
  }: ExampleParams = {}) {
    this.id = id
    this.createdDate = createdDate
    this.data = data
  }

  getId(): string {
    return this.id
  }

  getDate(): string {
    return this.createdDate
  }

  getData(): object {
    return this.data
  }
}
