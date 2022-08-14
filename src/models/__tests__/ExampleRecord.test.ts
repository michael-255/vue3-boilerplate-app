import { describe, test, expect } from 'vitest'
import { ExampleRecord } from '@/models/ExampleRecord'
import { AppTable, Field, Operation } from '@/constants/data-enums'

describe('ExampleRecord', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testParentId = 'test-parent-id'
  const testValue = 42
  const testRounds = [
    { primary: 1, secondary: 2 },
    { primary: 2, secondary: 4 },
  ]

  test('ExampleRecord should have correct number of properties', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      parentId: testParentId,
      value: testValue,
      rounds: testRounds,
    }
    const record = new ExampleRecord(params)
    expect(Object.keys(record).length).toBe(5)
  })

  test('create ExampleRecord with params', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      parentId: testParentId,
      value: testValue,
      rounds: testRounds,
    }
    const record = new ExampleRecord(params)
    expect(record.id).toBe(testId)
    expect(record.createdDate).toBe(testDate)
    expect(record.parentId).toBe(testParentId)
    expect(record.value).toBe(testValue)
    expect(record.rounds).toBe(testRounds)
  })

  test('ExampleRecord static getFields returns correct fields', () => {
    expect(ExampleRecord.getFields()).toEqual([
      Field.ID,
      Field.CREATED_DATE,
      Field.PARENT_ID,
      Field.VALUE,
      Field.ROUNDS,
    ])
  })

  test('ExampleRecord static getColumns returns correct columns', () => {
    ExampleRecord.getColumns().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('ExampleRecord static getColumnOptions returns correct column options', () => {
    ExampleRecord.getColumnOptions().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('ExampleRecord static getRelatedTable returns correct related table', () => {
    expect(ExampleRecord.getRelatedTable()).toBe(AppTable.EXAMPLES)
  })

  test('ExampleRecord static getSingularLabel returns the singular label', () => {
    expect(ExampleRecord.getSingularLabel()).toBe('Example Record')
  })

  test('ExampleRecord static getPluralLabel returns the plural label', () => {
    expect(ExampleRecord.getPluralLabel()).toBe('Example Records')
  })

  test('ExampleRecord static getSupportedOperations returns correct operations', () => {
    expect(ExampleRecord.getSupportedOperations()).toEqual([
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ])
  })

  test('ExampleRecord static getVisibleColumns returns default visible columns', () => {
    expect(ExampleRecord.getVisibleColumns()).toEqual([Field.CREATED_DATE])
  })
})
