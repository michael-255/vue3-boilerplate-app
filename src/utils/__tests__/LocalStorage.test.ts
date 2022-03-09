import { describe, test, expect, beforeEach, vi } from 'vitest'
import { LocalStorage } from '../classes/LocalStorage'

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

  test('should use initItems params and initialValue to call getItem and setItem', () => {
    webStorage.initItems(['init'])
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('@init#')
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('@init#', '"val"')
  })

  test('should use clearItems params and initialValue to call setItem', () => {
    webStorage.clearItems(['clear'])
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('@clear#', '"val"')
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
