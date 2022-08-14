import { describe, test, expect } from 'vitest'
import { SettingKey } from '@/constants/data-enums'
import { Setting } from '@/models/Setting'

describe('Setting', () => {
  test('create Setting with a SettingKey', () => {
    const setting = new Setting({ key: SettingKey.DEBUG, value: true })
    expect(setting.key).toBe(SettingKey.DEBUG)
    expect(setting.value).toBe(true)
  })
})
