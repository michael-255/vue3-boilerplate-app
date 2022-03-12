import { describe, test, expect, spyOn, vi } from 'vitest'
import * as common from '../common'

describe('downloadFile', () => {
  test('should be a function', () => {
    vi.clearAllMocks()
    HTMLElement.prototype.click = vi.fn() // Using vi.fn() to suppress navigation error
    const docSpy = spyOn(Document.prototype, 'createElement')
    const attrSpy = spyOn(HTMLElement.prototype, 'setAttribute')
    // const appendSpy = spyOn(Document.prototype.body, 'appendChild') // Not working

    common.downloadFile({
      fileName: 'test',
      extension: 'csv',
      mimeType: 'text/csv',
      textContent: '1,2,3',
    })

    expect(docSpy).toHaveBeenCalledWith('a')
    expect(attrSpy).toHaveBeenNthCalledWith(1, 'href', 'data:text/csv;charset=utf-8,1%2C2%2C3')
    expect(attrSpy).toHaveBeenNthCalledWith(2, 'download', 'test.csv')
    // expect(appendSpy).toHaveBeenCalled() // Not working
    expect(HTMLElement.prototype.click).toHaveBeenCalled()
  })
})

describe('isDataInObject', () => {
  test('should return true when the object has properties', () => {
    // Incorrect type of object or no properties
    expect(common.isDataInObject({})).toBe(false)
    expect(common.isDataInObject([])).toBe(false)
    expect(common.isDataInObject(() => 'test')).toBe(false)
    // Correct object type with at least one property
    expect(common.isDataInObject({ test: 123 })).toBe(true)
    expect(common.isDataInObject({ 0: 'a' })).toBe(true)
    expect(common.isDataInObject({ test: 123, more: null, str: 'test' })).toBe(true)
  })
})

describe('isDataInArray', () => {
  test('should return true when the array has elements', () => {
    // Empty array
    expect(common.isDataInArray([])).toBe(false)
    // Array with elements
    expect(common.isDataInArray([undefined])).toBe(true)
    expect(common.isDataInArray([null])).toBe(true)
    expect(common.isDataInArray([1])).toBe(true)
    expect(common.isDataInArray([{}])).toBe(true)
    expect(common.isDataInArray([[]])).toBe(true)
    expect(common.isDataInArray(['test'])).toBe(true)
  })
})
