import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../settings'

describe('useAppStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('toggleDrawer toggles the drawer boolean', () => {
    const ui = useAppStore()
    ui.drawer = false
    ui.toggleDrawer()
    expect(ui.drawer).toBe(true)
    ui.toggleDrawer()
    expect(ui.drawer).toBe(false)
  })

  test('openDrawer sets the drawer boolean to true', () => {
    const ui = useAppStore()
    ui.drawer = false
    ui.openDrawer()
    expect(ui.drawer).toBe(true)
  })

  test('closeDrawer sets the drawer boolean to false', () => {
    const ui = useAppStore()
    ui.drawer = true
    ui.closeDrawer()
    expect(ui.drawer).toBe(false)
  })
})
