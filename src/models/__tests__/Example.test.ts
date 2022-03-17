import { describe, test, expect } from 'vitest'
import { Example } from '../Example'

const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/

describe('Example', () => {
  const exampleId = 'TEST-4321'
  const exampleDate = new Date('2022/1/1').toISOString()
  const exampleAttrs = { abc: 123 }

  const example = new Example({
    id: exampleId,
    createdDate: exampleDate,
    data: exampleAttrs,
  })

  test('should return an id when calling getId', () => {
    expect(example.getId()).toBe(exampleId)
  })

  test('should return an ISO string date when calling getDate', () => {
    expect(example.getDate()).toMatch(isoDateRegex)
  })

  test('should return the example attributes object when calling getAttributes', () => {
    expect(example.getData()).toMatchObject(exampleAttrs)
  })
})
