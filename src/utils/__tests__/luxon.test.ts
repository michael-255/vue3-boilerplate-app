import { describe, test, expect } from 'vitest'
import * as lux from '@/utils/luxon'

describe('isoToDisplayDate', () => {
  test('should return a formatted display date', () => {
    expect(lux.isoToDisplayDate(new Date('2022-01-01').toISOString())).toBe(
      'Fri Dec 31 2021 7:00:00 PM EST'
    )
  })

  test('should return "-" when input is invalid', () => {
    expect(lux.isoToDisplayDate('')).toBe('-')
  })
})
