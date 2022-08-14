import { describe, test, expect } from 'vitest'
import * as datetime from '@/utils/date-time'

describe('getOrdinalString', () => {
  test('should throw an error for a non-integar parameter', () => {
    expect(() => datetime.getOrdinalString(12.5)).toThrow()
  })

  test('should return "st" for integars ending with a 1 (except 11)', () => {
    expect(datetime.getOrdinalString(1)).toBe('st')
    expect(datetime.getOrdinalString(21)).toBe('st')
    expect(datetime.getOrdinalString(101)).toBe('st')
    expect(datetime.getOrdinalString(1021)).toBe('st')
  })

  test('should return "nd" for integars ending with a 2 (except 12)', () => {
    expect(datetime.getOrdinalString(2)).toBe('nd')
    expect(datetime.getOrdinalString(22)).toBe('nd')
    expect(datetime.getOrdinalString(102)).toBe('nd')
    expect(datetime.getOrdinalString(1022)).toBe('nd')
  })

  test('should return "rd" for integars ending with a 2 (except 13)', () => {
    expect(datetime.getOrdinalString(3)).toBe('rd')
    expect(datetime.getOrdinalString(23)).toBe('rd')
    expect(datetime.getOrdinalString(103)).toBe('rd')
    expect(datetime.getOrdinalString(1023)).toBe('rd')
  })

  test('should return "th" for integars not ending in 1,2, or 3 (except 11, 12, and 13)', () => {
    expect(datetime.getOrdinalString(0)).toBe('th')
    expect(datetime.getOrdinalString(4)).toBe('th')
    expect(datetime.getOrdinalString(11)).toBe('th')
    expect(datetime.getOrdinalString(12)).toBe('th')
    expect(datetime.getOrdinalString(13)).toBe('th')
    expect(datetime.getOrdinalString(24)).toBe('th')
    expect(datetime.getOrdinalString(104)).toBe('th')
    expect(datetime.getOrdinalString(1024)).toBe('th')
  })
})

describe('getDurationString', () => {
  test('should throw an error for a non-integar parameter', () => {
    expect(() => datetime.getDurationString(12.5)).toThrow()
  })

  test('should return only portions of string with times > 1', () => {
    expect(datetime.getDurationString(999)).toBe('-')
    expect(datetime.getDurationString(datetime.Milliseconds.PERSECOND)).toBe('1s')
    expect(datetime.getDurationString(datetime.Milliseconds.PERMINUTE)).toBe('1m')
    expect(datetime.getDurationString(datetime.Milliseconds.PERHOUR)).toBe('1h')
    expect(datetime.getDurationString(datetime.Milliseconds.PERDAY)).toBe('1d')

    let duration = datetime.Milliseconds.PERSECOND + datetime.Milliseconds.PERDAY
    expect(datetime.getDurationString(duration)).toBe('1d 1s')

    duration += datetime.Milliseconds.PERMINUTE
    expect(datetime.getDurationString(duration)).toBe('1d 1m 1s')

    duration += datetime.Milliseconds.PERHOUR
    expect(datetime.getDurationString(duration)).toBe('1d 1h 1m 1s')
  })

  test('should return "2d 2h 2m 2s" for constant times doubled as duration', () => {
    let duration = datetime.Milliseconds.PERSECOND * 2
    duration += datetime.Milliseconds.PERMINUTE * 2
    duration += datetime.Milliseconds.PERHOUR * 2
    duration += datetime.Milliseconds.PERDAY * 2
    expect(datetime.getDurationString(duration)).toBe('2d 2h 2m 2s')
  })
})

describe('getMediumDateString', () => {
  test('should return NaN for an invalid Date', () => {
    expect(datetime.getShortDateString(new Date('INVALID'))).toBe('NaN/NaN/NaN')
  })

  test('should return short display date', () => {
    expect(datetime.getShortDateString(new Date('2020/1/1'))).toBe('1/1/2020')
    expect(datetime.getShortDateString(new Date('2022/4/12'))).toBe('4/12/2022')
    expect(datetime.getShortDateString(new Date('2023/12/3'))).toBe('12/3/2023')
  })
})

describe('getMediumDateString', () => {
  test('should return NaN for an invalid Date', () => {
    expect(datetime.getMediumDateString(new Date('INVALID'))).toBe('undefined, undefined NaN, NaN')
  })

  test('should return medium display date', () => {
    expect(datetime.getMediumDateString(new Date('2020/1/1'))).toBe('Wed, Jan 1, 2020')
    expect(datetime.getMediumDateString(new Date('2022/4/12'))).toBe('Tue, Apr 12, 2022')
    expect(datetime.getMediumDateString(new Date('2023/12/3'))).toBe('Sun, Dec 3, 2023')
  })
})

describe('getLongDateString', () => {
  test('should return NaN for an invalid Date', () => {
    expect(() => datetime.getLongDateString(new Date('INVALID'))).toThrow() // other func fails
  })

  test('should return long display date', () => {
    expect(datetime.getLongDateString(new Date('2020/1/1'))).toBe('Wednesday, January 1st, 2020')
    expect(datetime.getLongDateString(new Date('2022/4/12'))).toBe('Tuesday, April 12th, 2022')
    expect(datetime.getLongDateString(new Date('2023/12/3'))).toBe('Sunday, December 3rd, 2023')
  })
})
