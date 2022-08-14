import { describe, test, expect } from 'vitest'
import { ExampleRecord } from '@/models/ExampleRecord'
import { DexieTable, Field, Operation } from '@/constants/data-enums'

describe('ExampleRecord', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testParentId = 'test-parent-id'
  const testValue = 42

  test('create ExampleRecord with params', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      parentId: testParentId,
      value: testValue,
    }
    const example = new ExampleRecord(params)
    expect(example.id).toBe(testId)
    expect(example.createdDate).toBe(testDate)
    expect(example.parentId).toBe(testParentId)
    expect(example.value).toBe(testValue)
  })

  test('ExampleRecord static getFields returns correct fields', () => {
    expect(ExampleRecord.getFields()).toEqual([
      Field.ID,
      Field.CREATED_DATE,
      Field.PARENT_ID,
      Field.VALUE,
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
    expect(ExampleRecord.getRelatedTable()).toBe(DexieTable.EXAMPLES)
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
