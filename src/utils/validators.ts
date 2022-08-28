export const ValidationRegex: Readonly<any> = {
  Date: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/, // JS ISO Date
  ShortText: /^.{1,40}$/, // 1-40 alphanumeric characters
  LongText: /^.{1,500}$/, // 1-500 alphanumeric characters
}

export function isObject(obj: any): boolean {
  return obj !== null && obj !== undefined && typeof obj === 'object' && !Array.isArray(obj)
}

export function isBoolean(bool: any): boolean {
  return bool === true || bool === false
}

export function isUndefined(value: any): boolean {
  return value === undefined || value === null || value === ''
}

export function isDefined(value: any): boolean {
  return !isUndefined(value)
}

export function isPositiveNumber(num: number): boolean {
  return typeof num === 'number' && isFinite(num) && num > 0 && num < 1000000000 // 9 zeros
}

export function isOptionalPositiveNumber(num: number | undefined): boolean {
  return isUndefined(num) || isPositiveNumber(num as number)
}

export function isId(id: string): boolean {
  return isDefined(id) && ValidationRegex.ShortText.test(id)
}

export function isDate(isoDate: string): boolean {
  return isDefined(isoDate) && ValidationRegex.Date.test(isoDate)
}

export function isOptionalDate(isoDate: string): boolean {
  return isUndefined(isoDate) || ValidationRegex.Date.test(isoDate)
}

export function isShortText(text: string): boolean {
  return isDefined(text) && ValidationRegex.ShortText.test(text)
}

export function isOptionalLongText(text: string): boolean {
  return isUndefined(text) || ValidationRegex.LongText.test(text)
}
