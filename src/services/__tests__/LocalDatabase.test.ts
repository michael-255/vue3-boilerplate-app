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
    DB = new LocalDatabase('TestDatabase')
    DB.users = {
      add: vi.fn(),
      where: whereMock,
    }
    DB.examples = {
      add: vi.fn(),
      orderBy: orderByMock,
    }
    DB.table = tableMock
    vi.clearAllMocks()
  })

  test('should call Dexie methods from addUser with provided parameter', () => {
    const mockUser = {
      attributes: { attrs: 123 },
      createdDate: '2022-01-01T05:00:00.000Z',
      id: 'USER-1234',
      name: 'Test User',
    }
    DB.addUser(mockUser)
    expect(DB.users.add).toHaveBeenCalledWith(mockUser)
  })

  test('should call Dexie methods from addExample with provided parameter', () => {
    const mockExample = {
      data: { datas: 123 },
      createdDate: '2022-02-02T05:00:00.000Z',
      id: 'EXAMPLE-1234',
    }
    DB.addExample(mockExample)
    expect(DB.examples.add).toHaveBeenCalledWith(mockExample)
  })

  test('should call Dexie methods from getAllFromStore with provided parameter', () => {
    DB.getAllFromStore('test')
    expect(DB.table).toHaveBeenCalledWith('test')
    expect(toArrayMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getUserByName with provided parameter', () => {
    DB.getUserByName('Test User')
    expect(DB.users.where).toHaveBeenCalledWith('name')
    expect(equalsIgnoreCaseMock).toHaveBeenCalledWith('Test User')
    expect(firstMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getNewestExample with provided parameter', () => {
    DB.getNewestExample()
    expect(DB.examples.orderBy).toHaveBeenCalledWith('createdDate')
    expect(lastMock).toHaveBeenCalled()
  })

  test('should call Dexie methods from getOldestExample with provided parameter', () => {
    DB.getOldestExample()
    expect(DB.examples.orderBy).toHaveBeenCalledWith('createdDate')
    expect(firstMock).toHaveBeenCalled()
  })
})
