import { describe, test, expect } from 'vitest'
import { ExampleRecord } from '@/models/ExampleRecord'

describe('ExampleRecord', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testParentId = 'test-parent-id'
  const testNumber = 42
  const testPrimaryRounds = [1, 2]
  const testSecondaryRounds = [4, 8]

  const testParams = {
    id: testId,
    createdDate: testDate,
    parentId: testParentId,
    number: testNumber,
    primaryRounds: testPrimaryRounds,
    secondaryRounds: testSecondaryRounds,
  }

  test('ExampleRecord should have correct number of properties', () => {
    const model = new ExampleRecord(testParams)
    const keys = Object.keys(model)
    expect(keys.length).toBe(6)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('parentId')).toBe(true)
    expect(keys.includes('number')).toBe(true)
    expect(keys.includes('primaryRounds')).toBe(true)
    expect(keys.includes('secondaryRounds')).toBe(true)
  })

  test('create ExampleRecord with params', () => {
    const model = new ExampleRecord(testParams)
    expect(model.id).toBe(testId)
    expect(model.createdDate).toBe(testDate)
    expect(model.parentId).toBe(testParentId)
    expect(model.number).toBe(testNumber)
    expect(model.primaryRounds).toBe(testPrimaryRounds)
    expect(model.secondaryRounds).toBe(testSecondaryRounds)
  })
})
