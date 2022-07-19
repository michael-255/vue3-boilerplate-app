export interface ISetting {
  id: string
  value: boolean | string | number
}

/**
 * Setting Class
 * @param params.id Key
 * @param params.value Value
 */
export class Setting {
  id: string
  value: boolean | string | number

  constructor(params: ISetting) {
    this.id = params.id
    this.value = params.value
  }
}
