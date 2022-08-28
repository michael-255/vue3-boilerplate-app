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

describe('isUndefined', () => {
  test('should return correct boolean result', () => {
    expect(val.isUndefined(null)).toBe(true)
    expect(val.isUndefined(undefined)).toBe(true)
    expect(val.isUndefined('')).toBe(true)
    expect(val.isUndefined({})).toBe(false)
    expect(val.isUndefined([])).toBe(false)
    expect(val.isUndefined(1)).toBe(false)
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

describe('isPositiveNumber', () => {
  test('should return correct boolean result', () => {
    expect(val.isPositiveNumber(0)).toBe(false)
    expect(val.isPositiveNumber(-1)).toBe(false)
    expect(val.isPositiveNumber(999999999)).toBe(true)
    expect(val.isPositiveNumber(1000000000)).toBe(false)
  })
})

describe('isOptionalPositiveNumber', () => {
  test('should return correct boolean result', () => {
    expect(val.isOptionalPositiveNumber(undefined)).toBe(true)
    expect(val.isOptionalPositiveNumber(0)).toBe(false)
    expect(val.isOptionalPositiveNumber(-1)).toBe(false)
    expect(val.isOptionalPositiveNumber(999999999)).toBe(true)
    expect(val.isOptionalPositiveNumber(1000000000)).toBe(false)
  })
})

describe('isId', () => {
  test('should return correct boolean result', () => {
    expect(val.isId('')).toBe(false)
    expect(val.isId('X')).toBe(true)
    expect(val.isId('abcdefghijklmnopqrstuvwxyz0123456789TEST')).toBe(true)
    expect(val.isId('abcdefghijklmnopqrstuvwxyz0123456789TESTX')).toBe(false)
  })
})

describe('isDate', () => {
  test('should return correct boolean result', () => {
    expect(val.isDate('')).toBe(false)
    expect(val.isDate(new Date().toISOString())).toBe(true)
  })
})

describe('isOptionalDate', () => {
  test('should return correct boolean result', () => {
    expect(val.isOptionalDate('')).toBe(true)
    expect(val.isOptionalDate(new Date().toISOString())).toBe(true)
  })
})

describe('isShortText', () => {
  test('should return correct boolean result', () => {
    const str40 = Array(20).fill('X').toString() + 'X'
    const str41 = Array(21).fill('X').toString()
    expect(val.isShortText('')).toBe(false)
    expect(val.isShortText('X')).toBe(true)
    expect(val.isShortText(str40)).toBe(true)
    expect(val.isShortText(str41)).toBe(false)
  })
})

describe('isOptionalLongText', () => {
  test('should return correct boolean result', () => {
    const str500 = Array(250).fill('X').toString() + 'X'
    const str501 = Array(251).fill('X').toString()
    expect(val.isOptionalLongText('')).toBe(true)
    expect(val.isOptionalLongText('X')).toBe(true)
    expect(val.isOptionalLongText(str500)).toBe(true)
    expect(val.isOptionalLongText(str501)).toBe(false)
  })
})
