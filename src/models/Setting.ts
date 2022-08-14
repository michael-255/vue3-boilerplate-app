import type { SettingKey } from '@/constants/data-enums'

export interface ISetting {
  id: SettingKey
  value: boolean | string | number
}

/**
 * Setting Class
 * @param params.id Key
 * @param params.value Value
 */
export class Setting {
  id: string // id instead of key so a new DB get method isn't needed
  value: boolean | string | number

  constructor(params: ISetting) {
    this.id = params.id as string // ids are strings in the database
    this.value = params.value
  }
}
