import { describe, test, expect } from 'vitest'
import { ExampleRecord } from '@/models/ExampleRecord'

describe('ExampleRecord', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testParentId = 'test-parent-id'
  const testNumber = 42
  const testPrimaryRounds = [1, 2]
  const testSecondaryRounds = [4, 8]

  test('ExampleRecord should have correct number of properties', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      parentId: testParentId,
      number: testNumber,
      primaryRounds: testPrimaryRounds,
      secondaryRounds: testSecondaryRounds,
    }
    const record = new ExampleRecord(params)
    expect(Object.keys(record).length).toBe(6)
  })

  test('create ExampleRecord with params', () => {
    const params = {
      id: testId,
      createdDate: testDate,
      parentId: testParentId,
      number: testNumber,
      primaryRounds: testPrimaryRounds,
      secondaryRounds: testSecondaryRounds,
    }
    const record = new ExampleRecord(params)
    expect(record.id).toBe(testId)
    expect(record.createdDate).toBe(testDate)
    expect(record.parentId).toBe(testParentId)
    expect(record.number).toBe(testNumber)
    expect(record.primaryRounds).toBe(testPrimaryRounds)
    expect(record.secondaryRounds).toBe(testSecondaryRounds)
  })
})
