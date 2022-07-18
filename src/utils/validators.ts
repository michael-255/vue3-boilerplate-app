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

export function isRequired(value: any): boolean {
  if (Array.isArray(value)) {
    return true
  } else if (isObject(value)) {
    return true
  } else if (isBoolean(value)) {
    return true
  } else {
    return !!value // Other primitives
  }
}

export function isRequiredNumber(num: any): boolean {
  return isRequired(num) && typeof num === 'number' && isFinite(num)
}

export function isOptionalNumber(num: any): boolean {
  return num === undefined || (typeof num === 'number' && isFinite(num))
}

export function isBlank(value: any): boolean {
  return value === ''
}

export function isIdValid(id: string): boolean {
  return isRequired(id) && ValidationRegex.ShortText.test(id)
}

export function isRequiredDateValid(date: string): boolean {
  return isRequired(date) && ValidationRegex.Date.test(date)
}

export function isOptionalDateValid(date: string): boolean {
  return isBlank(date) || ValidationRegex.Date.test(date)
}

export function isShortTextValid(name: string): boolean {
  return isRequired(name) && ValidationRegex.ShortText.test(name)
}

export function isTextValid(text: string): boolean {
  return isBlank(text) || ValidationRegex.LongText.test(text)
}
