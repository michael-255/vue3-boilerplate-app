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
    // expect(appendSpy).toHaveBeenCalled()
    expect(HTMLElement.prototype.click).toHaveBeenCalled()
  })
})

describe('hasData', () => {
  test('should return true when the object has properties', () => {
    expect(common.hasData({})).toBe(false)
    expect(common.hasData({ test: 123 })).toBe(true)
    expect(
      common.hasData({
        test: 123,
        more: null,
        str: 'test',
      })
    ).toBe(true)
  })

  test('should return true when the array has elements', () => {
    expect(common.hasData([])).toBe(false)
    expect(common.hasData([1])).toBe(true)
    expect(common.hasData([{}])).toBe(true)
    expect(common.hasData([[]])).toBe(true)
    expect(common.hasData(['test'])).toBe(true)
  })
})
