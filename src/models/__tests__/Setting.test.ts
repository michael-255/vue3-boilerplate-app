import { describe, test, expect } from 'vitest'
import { SettingKey } from '@/constants/data-enums'
import { Setting } from '@/models/Setting'

describe('Setting', () => {
  test('Setting should have correct number of properties', () => {
    const setting = new Setting({ key: SettingKey.DEBUG, value: true })
    expect(Object.keys(setting).length).toBe(2)
  })

  test('create Setting with a SettingKey', () => {
    const setting = new Setting({ key: SettingKey.DEBUG, value: true })
    expect(setting.key).toBe(SettingKey.DEBUG)
    expect(setting.value).toBe(true)
  })
})
