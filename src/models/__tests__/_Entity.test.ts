import { describe, test, expect } from 'vitest'
import { _Entity } from '@/models/_Entity'

describe('_Entity', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'

  const testParams = {
    id: testId,
    createdDate: testDate,
  }

  test('_Entity should have correct properties', () => {
    const model = new _Entity(testParams)
    const keys = Object.keys(model)
    expect(keys.length).toBe(2)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
  })

  test('create _Entity with params', () => {
    const model = new _Entity(testParams)
    expect(model.id).toBe(testId)
    expect(model.createdDate).toBe(testDate)
  })
})
