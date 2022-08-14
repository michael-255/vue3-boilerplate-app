import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUIStore } from '@/stores/ui'

describe('useUIStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('toggleDrawer toggles the drawer boolean', () => {
    const ui = useUIStore()
    ui.drawer = false
    ui.toggleDrawer()
    expect(ui.drawer).toBe(true)
    ui.toggleDrawer()
    expect(ui.drawer).toBe(false)
  })

  test('openDrawer sets the drawer boolean to true', () => {
    const ui = useUIStore()
    ui.drawer = false
    ui.openDrawer()
    expect(ui.drawer).toBe(true)
  })

  test('closeDrawer sets the drawer boolean to false', () => {
    const ui = useUIStore()
    ui.drawer = true
    ui.closeDrawer()
    expect(ui.drawer).toBe(false)
  })
})
