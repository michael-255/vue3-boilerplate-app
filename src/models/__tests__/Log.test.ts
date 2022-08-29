import { describe, test, expect } from 'vitest'
import { Log } from '@/models/Log'
import { Severity } from '@/constants/data-enums'

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
    const model = new Log(testParams)
    const keys = Object.keys(model)
    expect(keys.length).toBe(7)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('severity')).toBe(true)
    expect(keys.includes('details')).toBe(true)
    expect(keys.includes('name')).toBe(true)
    expect(keys.includes('message')).toBe(true)
    expect(keys.includes('stack')).toBe(true)
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
})
