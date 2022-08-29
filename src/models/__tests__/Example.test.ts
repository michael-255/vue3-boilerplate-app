import { describe, test, expect } from 'vitest'
import { Example } from '@/models/Example'

describe('Example', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'
  const testName = 'test-name'
  const testDesc = 'test-desc'

  const testParams = {
    id: testId,
    createdDate: testDate,
    name: testName,
    description: testDesc,
  }

  test('Example should have correct number of properties', () => {
    const model = new Example(testParams)
    const keys = Object.keys(model)
    expect(keys.length).toBe(4)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('name')).toBe(true)
    expect(keys.includes('description')).toBe(true)
  })

  test('create Example with params', () => {
    const model = new Example(testParams)
    expect(model.id).toBe(testId)
    expect(model.createdDate).toBe(testDate)
    expect(model.name).toBe(testName)
    expect(model.description).toBe(testDesc)
  })
})
