import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalStorage } from '../LocalStorage'

describe('LocalStorage', () => {
  let webStorage: LocalStorage

  beforeEach(() => {
    vi.clearAllMocks()
    webStorage = new LocalStorage({ prefix: '@', suffix: '#', initialValue: 'val' })
    Storage.prototype.setItem = vi.fn()
    Storage.prototype.getItem = vi.fn()
  })

  test('should have adjusted key names based on prefix and suffix parameters', () => {
    expect(webStorage.prefix).toBe('@')
    expect(webStorage.suffix).toBe('#')
    expect(webStorage.initialValue).toBe('val')
  })

  test('should call getItem and setItem using initItems params and initialValue', () => {
    const items = ['init1', 'init2', 'init3']
    webStorage.initItems(items[0])
    expect(Storage.prototype.getItem).toHaveBeenNthCalledWith(1, '@init1#')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(1, '@init1#', '"val"')

    webStorage.initItems(...items)
    expect(Storage.prototype.getItem).toHaveBeenNthCalledWith(2, '@init1#')
    expect(Storage.prototype.getItem).toHaveBeenNthCalledWith(3, '@init2#')
    expect(Storage.prototype.getItem).toHaveBeenNthCalledWith(4, '@init3#')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(2, '@init1#', '"val"')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(3, '@init2#', '"val"')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(4, '@init3#', '"val"')
  })

  test('should use clearItems params and initialValue to call setItem', () => {
    const items = ['clear1', 'clear2', 'clear3']
    webStorage.clearItems(items[0])
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(1, '@clear1#', '"val"')

    webStorage.clearItems(...items)
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(2, '@clear1#', '"val"')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(3, '@clear2#', '"val"')
    expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(4, '@clear3#', '"val"')
  })

  test('should use set params to call setItem', () => {
    webStorage.set('set', 'test data')
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('@set#', '"test data"')
  })

  test('should use get parameter to call getItem', () => {
    webStorage.get('get')
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('@get#')
  })

  test('should return null or some data using parameter', () => {
    expect(webStorage.get('test')).toBe(null)

    const json = JSON.stringify({ test: 123 })
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(json))
    expect(webStorage.get('test')).toBe(json)
  })
})
