import { describe, test, expect } from 'vitest'
import { Example } from '@/models/Example'
import { AppTable, Field, Operation } from '@/constants/data-enums'

describe('Example', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testName = 'test-name'
  const testDesc = 'test-desc'

  test('Example should have correct number of properties', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      name: testName,
      description: testDesc,
    }
    const example = new Example(params)
    expect(Object.keys(example).length).toBe(4)
  })

  test('create Example with params', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      name: testName,
      description: testDesc,
    }
    const example = new Example(params)
    expect(example.id).toBe(testId)
    expect(example.createdDate).toBe(testDate)
    expect(example.name).toBe(testName)
    expect(example.description).toBe(testDesc)
  })

  test('Example static getFields returns correct fields', () => {
    expect(Example.getFields()).toEqual([
      Field.ID,
      Field.CREATED_DATE,
      Field.NAME,
      Field.DESCRIPTION,
    ])
  })

  test('Example static getColumns returns correct columns', () => {
    Example.getColumns().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('Example static getColumnOptions returns correct column options', () => {
    Example.getColumnOptions().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('Example static getRelatedTable returns correct related table', () => {
    expect(Example.getRelatedTable()).toBe(AppTable.EXAMPLE_RECORDS)
  })

  test('Example static getSingularLabel returns the singular label', () => {
    expect(Example.getSingularLabel()).toBe('Example')
  })

  test('Example static getPluralLabel returns the plural label', () => {
    expect(Example.getPluralLabel()).toBe('Examples')
  })

  test('Example static getSupportedOperations returns correct operations', () => {
    expect(Example.getSupportedOperations()).toEqual([
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
      Operation.REPORT,
    ])
  })

  test('Example static getVisibleColumns returns default visible columns', () => {
    expect(Example.getVisibleColumns()).toEqual([Field.CREATED_DATE])
  })
})
