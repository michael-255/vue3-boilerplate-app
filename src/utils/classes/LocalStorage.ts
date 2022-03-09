type localStorageParams = {
  prefix?: string
  suffix?: string
  initialValue?: any
}

/**
 * Simple wrapper for localStorage with some basic additions.
 * @param prefix Item key prefix string
 * @param suffix Intem key suffix string
 * @param initialValue Value that is used when initializing or clearing an item
 */
export class LocalStorage {
  prefix: string
  suffix: string
  initialValue: any

  constructor({ prefix = '', suffix = '', initialValue = [] }: localStorageParams = {}) {
    this.prefix = prefix
    this.suffix = suffix
    this.initialValue = initialValue
  }

  initItems(itemKeys: string[]): void {
    itemKeys.forEach((key) => {
      const existingItemData = this.get(key)
      if (!existingItemData) {
        this.set(key, this.initialValue)
      }
    })
  }

  clearItems(itemKeys: string[]): void {
    itemKeys.forEach((key) => this.set(key, this.initialValue))
  }

  set(key: string, value: any): void {
    const json = JSON.stringify(value)
    const transformedKey = `${this.prefix}${key}${this.suffix}`
    localStorage.setItem(transformedKey, json)
  }

  get(key: string): string | null {
    const transformedKey = `${this.prefix}${key}${this.suffix}`
    const data = localStorage.getItem(transformedKey)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }
}
