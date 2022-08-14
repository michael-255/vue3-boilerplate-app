import { describe, test, expect } from 'vitest'
import { Log } from '@/models/Log'
import { Field, Operation, Severity } from '@/constants/data-enums'

describe('Log', () => {
  const testError = new Error()
  const testSeverity = Severity.DEBUG
  const testDetails = 'test-details'
  const testName = 'test-error-name'
  const testMessage = 'test-error-message'
  const testStack = 'test-error-stack'
  const testParams = {
    severity: testSeverity,
    details: testDetails,
    error: testError,
  }

  test('Log should have correct number of properties', () => {
    const log = new Log(testParams)
    expect(Object.keys(log).length).toBe(7)
  })

  test('create Log with Error object', () => {
    const log = new Log(testParams)
    expect(log.id).toEqual(expect.any(String))
    expect(log.createdDate).toEqual(expect.any(String))
    expect(log.severity).toBe(testSeverity)
    expect(log.details).toBe(testDetails)
    expect(log.name).toBe('Error')
    expect(log.message).toEqual(expect.any(String))
    expect(log.stack).toEqual(expect.any(String))
  })

  test('create Log with custom object', () => {
    const testCustomParams = {
      severity: testSeverity,
      details: testDetails,
      error: {
        name: testName,
        message: testMessage,
        stack: testStack,
      },
    }
    const log = new Log(testCustomParams)
    expect(log.id).toEqual(expect.any(String))
    expect(log.createdDate).toEqual(expect.any(String))
    expect(log.severity).toBe(testSeverity)
    expect(log.details).toBe(testDetails)
    expect(log.name).toBe(testName)
    expect(log.message).toBe(testMessage)
    expect(log.stack).toBe(testStack)
  })

  test('create Log with no object', () => {
    const testNoObjParams = {
      severity: testSeverity,
      details: testDetails,
    }
    const log = new Log(testNoObjParams)
    expect(log.id).toEqual(expect.any(String))
    expect(log.createdDate).toEqual(expect.any(String))
    expect(log.severity).toBe(testSeverity)
    expect(log.details).toBe(testDetails)
    expect(log.name).toBeUndefined()
    expect(log.message).toBeUndefined()
    expect(log.stack).toBeUndefined()
  })

  test('Log static getFields returns correct fields', () => {
    expect(Log.getFields()).toEqual([
      Field.ID,
      Field.CREATED_DATE,
      Field.SEVERITY,
      Field.DETAILS,
      Field.NAME,
      Field.MESSAGE,
      Field.STACK,
    ])
  })

  test('Log static getColumns returns correct columns', () => {
    Log.getColumns().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('Log static getColumnOptions returns correct column options', () => {
    Log.getColumnOptions().forEach((col) => {
      expect(col).toHaveProperty('name')
      expect(col).toHaveProperty('label')
      expect(col).toHaveProperty('align')
      expect(col).toHaveProperty('sortable')
      expect(col).toHaveProperty('required')
      expect(col).toHaveProperty('field')
      expect(col).toHaveProperty('format')
    })
  })

  test('Log static getRelatedTable returns null', () => {
    expect(Log.getRelatedTable()).toBeNull()
  })

  test('Log static getSingularLabel returns the singular label', () => {
    expect(Log.getSingularLabel()).toBe('Log')
  })

  test('Log static getPluralLabel returns the plural label', () => {
    expect(Log.getPluralLabel()).toBe('Logs')
  })

  test('Log static getSupportedOperations returns correct operations', () => {
    expect(Log.getSupportedOperations()).toEqual([
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ])
  })

  test('Log static getVisibleColumns returns default visible columns', () => {
    expect(Log.getVisibleColumns()).toEqual([
      Field.CREATED_DATE,
      Field.SEVERITY,
      Field.DETAILS,
      Field.NAME,
    ])
  })
})
