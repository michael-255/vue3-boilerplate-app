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

export function isDefined(value: any): boolean {
  if (value !== null && value !== undefined && value !== '') {
    return true
  }
  return false
}

export function isValidNumber(num: number): boolean {
  return num >= 0 && num <= 999999999 && typeof num === 'number' && isFinite(num)
}

export function isOptionalNumber(num: number | undefined): boolean {
  return num === undefined || isValidNumber(num)
}

export function isBlank(value: string): boolean {
  return value === ''
}

export function isIdValid(id: string): boolean {
  return isDefined(id) && ValidationRegex.ShortText.test(id)
}

export function isRequiredDateValid(date: string): boolean {
  return isDefined(date) && ValidationRegex.Date.test(date)
}

export function isOptionalDateValid(date: string): boolean {
  return isBlank(date) || ValidationRegex.Date.test(date)
}

export function isShortTextValid(name: string): boolean {
  return isDefined(name) && ValidationRegex.ShortText.test(name)
}

export function isLongTextValid(text: string): boolean {
  return isBlank(text) || ValidationRegex.LongText.test(text)
}
