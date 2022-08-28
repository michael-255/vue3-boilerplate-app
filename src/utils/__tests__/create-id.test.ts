import { describe, test, expect } from 'vitest'
import { uuid, customId } from '@/utils/create-id'

describe('customId', () => {
  test('should throw error if segmentLengths param has less then 1 element', () => {
    expect(() => {
      customId({ segmentLengths: [] })
    }).toThrow()
  })

  test('should throw error if segmentLengths param has any non-positive numbers', () => {
    expect(() => {
      customId({ segmentLengths: [-9, 8] })
    }).toThrow()
    expect(() => {
      customId({ segmentLengths: [8, 0] })
    }).toThrow()
    expect(() => {
      customId({ segmentLengths: [8, 0.999, 8] })
    }).toThrow()
  })

  test('should throw error if delimiter param is not a string of length 1 or empty', () => {
    expect(() => {
      customId({ delimiter: 'invalid-delimiet' })
    }).toThrow()
  })

  test('should create a custom id based on the params ', () => {
    const defaultId = customId()
    const bigId = customId({
      segmentLengths: [2, 2, 2, 2, 2, 2],
      delimiter: ':',
    })
    const packedId = customId({
      segmentLengths: [8, 8, 8],
      delimiter: '',
    })
    const upcId = customId({
      segmentLengths: [2, 8, 8, 2],
      delimiter: '_',
    })

    expect(defaultId).toMatch(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/)
    expect(bigId).toMatch(/[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}/)
    expect(packedId).toMatch(/[A-Z0-9]{24}/)
    expect(upcId).toMatch(/[A-Z0-9]{2}_[A-Z0-9]{8}_[A-Z0-9]{8}_[A-Z0-9]{2}/)
  })
})
