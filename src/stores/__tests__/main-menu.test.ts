import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useMainMenuStore from '@/stores/main-menu'

describe('useMainMenuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('expected properties are on the store', () => {
    const mainMenuKeys = Object.keys(useMainMenuStore())
    expect(mainMenuKeys.includes('drawer')).toBe(true)
  })
})
