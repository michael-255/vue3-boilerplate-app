import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalDatabase } from '@/services/LocalDatabase'

const tableMock = vi.fn().mockReturnValue({
  toArray: vi.fn(),
  where: vi.fn().mockReturnValue({
    equalsIgnoreCase: vi.fn().mockReturnValue({
      first: vi.fn(),
      toArray: vi.fn(),
      sortBy: vi.fn().mockReturnValue({
        reverse: vi.fn(),
      }),
    }),
  }),
  bulkGet: vi.fn().mockReturnValue({
    filter: vi.fn(),
  }),
  add: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  clear: vi.fn(),
  bulkAdd: vi.fn(),
})

describe('LocalDatabase', () => {
  let database: any
  const testTable = 'testTable'
  const testId = 'test-id-123'
  const testIds = ['id-1', 'id-2', 'id-3']
  const testName = 'Test Name'
  const testData = { id: 'test1' }
  const testDatas = [{ id: 'test1' }, { id: 'test2' }]

  beforeEach(() => {
    database = new LocalDatabase('TestDatabase')
    database.table = tableMock
    vi.clearAllMocks()
  })

  test('getAll calls correct Dexie methods', async () => {
    database.table().toArray = vi.fn().mockReturnValue(testDatas)

    const result = await database.getAll(testTable)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().toArray).toHaveBeenCalled()
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('getById returns item by id', async () => {
    database.table().where().equalsIgnoreCase().first = vi.fn().mockReturnValue(testData)

    const result = await database.getById(testTable, testId)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('id')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(testData)
  })

  test('getByName returns an array of items with that macthing name', async () => {
    database.table().where().equalsIgnoreCase().toArray = vi.fn().mockReturnValue(testDatas)

    const result = await database.getByName(testTable, testName)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('name')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testName)
    expect(database.table().where().equalsIgnoreCase().toArray).toHaveBeenCalled()
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('getByParentId calls correct Dexie methods', async () => {
    database.table().where().equalsIgnoreCase().sortBy = vi.fn().mockReturnValue(testDatas)

    const result = await database.getByParentId(testTable, testId)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('parentId')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.table().where().equalsIgnoreCase().sortBy).toHaveBeenCalledWith('createdAt')
    expect(result).toBe(testDatas)
  })

  test('getNewestByParentId returns the newest item by the parentId', async () => {
    database.table().where().equalsIgnoreCase().sortBy().reverse = vi
      .fn()
      .mockReturnValue(testDatas)

    const result = await database.getNewestByParentId(testTable, testId)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('parentId')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.table().where().equalsIgnoreCase().sortBy).toHaveBeenCalledWith('createdAt')
    expect(database.table().where().equalsIgnoreCase().sortBy().reverse).toHaveBeenCalledWith()
    expect(result).toMatchObject(testDatas[0]) // only returns the first element
  })

  test('bulkGetByIds returns items from the table by the provided ids', async () => {
    database.table().bulkGet = vi.fn().mockReturnValue(testDatas)

    const result = await database.bulkGetByIds(testTable, testIds)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().bulkGet).toHaveBeenCalledWith(testIds)
    expect(result).toEqual(expect.arrayContaining(testDatas))
  })

  test('deleteById returns undefined when nothing is deleted', async () => {
    database.table().where().equalsIgnoreCase().first = vi.fn().mockReturnValue(undefined)

    const result = await database.deleteById(testTable, testId)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('id')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(undefined)
  })

  test('deleteById returns the item that was deleted', async () => {
    database.table().where().equalsIgnoreCase().first = vi.fn().mockReturnValue(testData)

    const result = await database.deleteById(testTable, testId)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().where).toHaveBeenCalledWith('id')
    expect(database.table().where().equalsIgnoreCase).toHaveBeenCalledWith(testId)
    expect(database.table().where().equalsIgnoreCase().first).toHaveBeenCalled()
    expect(result).toBe(testData)
  })

  test('clear removes all table data and returns undefined', async () => {
    database.table().clear = vi.fn().mockReturnValue(undefined)

    const result = await database.clear(testTable)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().clear).toHaveBeenCalled()
    expect(result).toBe(undefined)
  })

  test('add inserts the new item into the table and returns the id', async () => {
    database.table().add = vi.fn().mockReturnValue(testId)

    const result = await database.add(testTable, testData)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().add).toHaveBeenCalledWith(testData)
    expect(result).toBe(testId)
  })

  test('bulkAdd inserts the new items in the table and returns the ids', async () => {
    database.table().bulkAdd = vi.fn().mockReturnValue(testIds)

    const result = await database.bulkAdd(testTable, testDatas)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().bulkAdd).toHaveBeenCalledWith(testDatas, { allKeys: true })
    expect(result).toBe(testIds)
  })

  test('updateById updates the item by id and returns a 1 on success', async () => {
    database.table().update = vi.fn().mockReturnValue(1)

    const properties = { name: testName }
    const result = await database.updateById(testTable, testId, properties)
    expect(database.table).toHaveBeenCalledWith(testTable)
    expect(database.table().update).toHaveBeenCalledWith(testId, properties)
    expect(result).toBe(1)
  })
})
