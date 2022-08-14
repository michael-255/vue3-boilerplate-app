import type { SettingKey } from '@/constants/data-enums'
import type { SettingValue } from '@/constants/types-interfaces'

export interface ISetting {
  key: SettingKey
  value: SettingValue
}

/**
 * Setting Class
 * @param params ISetting
 */
export class Setting {
  key: SettingKey
  value: SettingValue

  constructor(params: ISetting) {
    this.key = params.key
    this.value = params.value
  }
}
