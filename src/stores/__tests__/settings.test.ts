import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useSettingsStore from '@/stores/settings'

describe('useSettingsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('expected properties are on the store', () => {
    const settings = Object.keys(useSettingsStore())
    expect(settings.includes('DEBUG')).toBe(true)
    expect(settings.includes('NOTIFY')).toBe(true)
    expect(settings.includes('INFO')).toBe(true)
  })

  /**
   * @todo
   * Figure out how to test settings with interal DB calls.
   */
  test('settings store has functions', () => {
    const settings = useSettingsStore()
    expect(typeof settings.initSettings).toBe('function')
    expect(typeof settings.setDEBUG).toBe('function')
    expect(typeof settings.setNOTIFY).toBe('function')
    expect(typeof settings.setINFO).toBe('function')
  })
})
