import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '../LocalDatabase'

describe('LocalDatabase', () => {
  let db: any
  const toArrayMock = vi.fn()
  const firstMock = vi.fn()
  const lastMock = vi.fn()
  const tableMock = vi.fn(() => ({ toArray: toArrayMock }))
  const equalsIgnoreCaseMock = vi.fn(() => ({ first: firstMock }))
  const whereMock = vi.fn(() => ({ equalsIgnoreCase: equalsIgnoreCaseMock }))
  const orderByMock = vi.fn(() => ({ first: firstMock, last: lastMock }))

  beforeEach(() => {
    db = new LocalDatabase()
    db.users = {
      add: vi.fn(),
      where: whereMock,
    }
    db.examples = {
      add: vi.fn(),
      orderBy: orderByMock,
    }
    db.table = tableMock
    vi.clearAllMocks()
  })

  test('should call Dexie methods from addUser with provided parameter', () => {
    const mockUser = {
      attributes: { attrs: 123 },
      createdDate: '2022-01-01T05:00:00.000Z',
      id: 'USER-1234',
      name: 'Test User',
    }
    db.addUser(mockUser)
    expect(db.users.add).toHaveBeenCalledWith(mockUser)
  })

  test('should call Dexie methods from addExample with provided parameter', () => {
    const mockExample = {
      data: { datas: 123 },
      createdDate: '2022-02-02T05:00:00.000Z',
      id: 'EXAMPLE-1234',
    }
    db.addExample(mockExample)
    expect(db.examples.add).toHaveBeenCalledWith(mockExample)
  })

  test('should call Dexie methods from getAllFromStore with provided parameter', () => {
    db.getAllFromStore('test')
    expect(db.table).toHaveBeenCalledWith('test')
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getUserByName with provided parameter', () => {
    db.getUserByName('Test User')
    expect(db.users.where).toHaveBeenCalledWith('name')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('Test User')
    expect(firstMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getNewestExample with provided parameter', () => {
    db.getNewestExample()
    expect(db.examples.orderBy).toHaveBeenCalledWith('createdDate')
    expect(lastMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getOldestExample with provided parameter', () => {
    db.getOldestExample()
    expect(db.examples.orderBy).toHaveBeenCalledWith('createdDate')
    expect(firstMock).toHaveBeenCalled()
  })
})
