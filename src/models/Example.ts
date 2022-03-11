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

  getId() {
    return this.id
  }

  displayCreatedDate() {
    return new Date(this.createdDate)
  }

  getData() {
    return this.data
  }
}
