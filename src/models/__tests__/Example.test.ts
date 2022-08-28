import { describe, test, expect } from 'vitest'
import { Example } from '@/models/Example'

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
})
