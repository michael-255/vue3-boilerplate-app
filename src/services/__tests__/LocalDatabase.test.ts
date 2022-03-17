import { describe, test, expect, beforeEach, vi } from 'vitest'
import { User } from '../../models/User'
import { LocalDatabase } from '../LocalDatabase'

const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/
const idRegex = /[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/

describe('LocalDatabase', () => {
  let db: any

  beforeEach(() => {
    vi.clearAllMocks()
    db = new LocalDatabase()
    db.users.add = vi.fn()
  })

  test('should have addUser method', () => {
    db.addUser()
    expect(db.users.add).toHaveBeenCalledWith([
      Object.assign(new User(), {
        attributes: {},
        createdDate: expect.stringMatching(isoDateRegex),
        id: expect.stringMatching(idRegex),
        name: 'My User',
      }),
    ])
  })
})
