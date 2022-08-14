import { describe, test, expect } from 'vitest'
import { buildIdFunction } from '@/utils/build-id'

describe('buildIdFunction', () => {
  test('should throw error if segmentLengths param has less then 1 element', () => {
    expect(() => {
      buildIdFunction({ segmentLengths: [] })
    }).toThrow()
  })

  test('should throw error if segmentLengths param has any non-positive numbers', () => {
    expect(() => {
      buildIdFunction({ segmentLengths: [-9, 8] })
    }).toThrow()
    expect(() => {
      buildIdFunction({ segmentLengths: [8, 0] })
    }).toThrow()
    expect(() => {
      buildIdFunction({ segmentLengths: [8, 0.999, 8] })
    }).toThrow()
  })

  test('should throw error if delimiter param is not a string of length 1 or empty', () => {
    expect(() => {
      buildIdFunction({ delimiter: 'invalid-length' })
    }).toThrow()
  })

  test('should return a function when called with valid parameters', () => {
    const idFunction = buildIdFunction()
    expect(typeof idFunction).toBe('function')
    expect(idFunction).toEqual(expect.any(Function))
  })

  test('should create an id function that creates ids based on build function params', () => {
    const defaultId = buildIdFunction()()
    const bigId = buildIdFunction({
      segmentLengths: [2, 2, 2, 2, 2, 2],
      delimiter: ':',
    })()
    const packedId = buildIdFunction({
      segmentLengths: [8, 8, 8],
      delimiter: '',
    })()
    const upcId = buildIdFunction({
      segmentLengths: [2, 8, 8, 2],
      delimiter: '_',
    })()

    expect(defaultId).toMatch(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/)
    expect(bigId).toMatch(/[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}/)
    expect(packedId).toMatch(/[A-Z0-9]{24}/)
    expect(upcId).toMatch(/[A-Z0-9]{2}_[A-Z0-9]{8}_[A-Z0-9]{8}_[A-Z0-9]{2}/)
  })
})
