import { describe, test, expect } from 'vitest'
import * as val from '@/utils/validators'

describe('ValidationRegex', () => {
  test('should return correct boolean result', () => {
    expect(val.ValidationRegex.Date.test(new Date().toISOString())).toBe(true)
    expect(val.ValidationRegex.ShortText.test('test')).toBe(true)
    expect(val.ValidationRegex.LongText.test('test')).toBe(true)
  })
})

describe('isObject', () => {
  test('should return correct boolean result', () => {
    expect(val.isObject({})).toBe(true)
    expect(val.isObject('')).toBe(false)
    expect(val.isObject(1)).toBe(false)
    expect(val.isObject([])).toBe(false)
  })
})

describe('isBoolean', () => {
  test('should return correct boolean result', () => {
    expect(val.isBoolean(true)).toBe(true)
    expect(val.isBoolean(false)).toBe(true)
    expect(val.isBoolean('')).toBe(false)
    expect(val.isBoolean(1)).toBe(false)
    expect(val.isBoolean([])).toBe(false)
    expect(val.isBoolean({})).toBe(false)
  })
})

describe('isDefined', () => {
  test('should return correct boolean result', () => {
    expect(val.isDefined(null)).toBe(false)
    expect(val.isDefined(undefined)).toBe(false)
    expect(val.isDefined('')).toBe(false)
    expect(val.isDefined({})).toBe(true)
    expect(val.isDefined([])).toBe(true)
    expect(val.isDefined(1)).toBe(true)
  })
})

describe('isValidNumber', () => {
  test('should return correct boolean result', () => {
    expect(val.isValidNumber(0)).toBe(true)
    expect(val.isValidNumber(-1)).toBe(false)
    expect(val.isValidNumber(999999999)).toBe(true)
    expect(val.isValidNumber(1000000000)).toBe(false)
  })
})

describe('isOptionalNumber', () => {
  test('should return correct boolean result', () => {
    expect(val.isOptionalNumber(undefined)).toBe(true)
    expect(val.isOptionalNumber(0)).toBe(true)
    expect(val.isOptionalNumber(-1)).toBe(false)
    expect(val.isOptionalNumber(999999999)).toBe(true)
    expect(val.isOptionalNumber(1000000000)).toBe(false)
  })
})

describe('isBlank', () => {
  test('should return correct boolean result', () => {
    expect(val.isBlank('')).toBe(true)
    expect(val.isBlank('test')).toBe(false)
  })
})

describe('isIdValid', () => {
  test('should return correct boolean result', () => {
    expect(val.isIdValid('')).toBe(false)
    expect(val.isIdValid('X')).toBe(true)
    expect(val.isIdValid('abcdefghijklmnopqrstuvwxyz0123456789TEST')).toBe(true)
    expect(val.isIdValid('abcdefghijklmnopqrstuvwxyz0123456789TESTX')).toBe(false)
  })
})

describe('isRequiredDateValid', () => {
  test('should return correct boolean result', () => {
    expect(val.isRequiredDateValid('')).toBe(false)
    expect(val.isRequiredDateValid(new Date().toISOString())).toBe(true)
  })
})

describe('isOptionalDateValid', () => {
  test('should return correct boolean result', () => {
    expect(val.isOptionalDateValid('')).toBe(true)
    expect(val.isOptionalDateValid(new Date().toISOString())).toBe(true)
  })
})

describe('isShortTextValid', () => {
  test('should return correct boolean result', () => {
    const str40 = Array(20).fill('X').toString() + 'X'
    const str41 = Array(21).fill('X').toString()
    expect(val.isShortTextValid('')).toBe(false)
    expect(val.isShortTextValid('X')).toBe(true)
    expect(val.isShortTextValid(str40)).toBe(true)
    expect(val.isShortTextValid(str41)).toBe(false)
  })
})

describe('isLongTextValid', () => {
  test('should return correct boolean result', () => {
    const str500 = Array(250).fill('X').toString() + 'X'
    const str501 = Array(251).fill('X').toString()
    expect(val.isLongTextValid('')).toBe(true)
    expect(val.isLongTextValid('X')).toBe(true)
    expect(val.isLongTextValid(str500)).toBe(true)
    expect(val.isLongTextValid(str501)).toBe(false)
  })
})
