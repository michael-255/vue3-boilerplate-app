import { describe, test, expect } from 'vitest'
import { _Entity } from '@/models/_Entity'

describe('_Entity', () => {
  const testId = 'test-id'
  const testDate = '2022-01-01T00:00:00.000Z'

  test('_Entity should have correct number of properties', () => {
    const params = {
      id: testId,
      createdDate: testDate,
    }
    const entity = new _Entity(params)
    expect(Object.keys(entity).length).toBe(2)
  })

  test('create _Entity with params', () => {
    const params = {
      id: testId,
      createdDate: testDate,
    }
    const entity = new _Entity(params)
    expect(entity.id).toBe(testId)
    expect(entity.createdDate).toBe('2022-01-01T00:00:00.000Z')
  })
})
