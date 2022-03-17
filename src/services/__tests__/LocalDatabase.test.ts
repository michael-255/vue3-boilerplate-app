import { describe, test, expect, beforeEach, vi } from 'vitest'
import type { IUser } from '../../models/User'
import type { IExample } from '../../models/Example'
import { LocalDatabase } from '../LocalDatabase'

class MockUser implements IUser {
  id: string
  createdDate: string
  name: string
  attributes: object

  constructor() {
    this.id = 'USER-1234'
    this.createdDate = new Date('2022/1/1').toISOString()
    this.name = 'Test User'
    this.attributes = { attrs: 123 }
  }
}

class MockExample implements IExample {
  id: string
  createdDate: string
  data: object

  constructor() {
    this.id = 'EXAMPLE-1234'
    this.createdDate = new Date('2022/2/2').toISOString()
    this.data = { datas: 123 }
  }
}

describe('LocalDatabase', () => {
  let db: any

  beforeEach(() => {
    vi.clearAllMocks()
    db = new LocalDatabase()
    db.users.add = vi.fn()
    db.examples.add = vi.fn()
  })

  test('should call add from addUser with provided parameter', () => {
    db.addUser(new MockUser())
    expect(db.users.add).toHaveBeenCalledWith(
      Object.assign(new MockUser(), {
        attributes: { attrs: 123 },
        createdDate: '2022-01-01T05:00:00.000Z',
        id: 'USER-1234',
        name: 'Test User',
      })
    )
  })

  test('should call add from addExample with provided parameter', () => {
    db.addUser(new MockExample())
    expect(db.users.add).toHaveBeenCalledWith(
      Object.assign(new MockExample(), {
        data: { datas: 123 },
        createdDate: '2022-02-02T05:00:00.000Z',
        id: 'EXAMPLE-1234',
      })
    )
  })
})
