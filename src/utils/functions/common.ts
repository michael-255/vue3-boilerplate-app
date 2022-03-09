type downloadFileParams = {
  fileName?: string
  extension?: string
  mimeType?: string
  textContent?: string
}

/**
 * Simple file download function for web apps.
 * @param fileName Name of file
 * @param extension File extension
 * @param mimeType Options like: 'application/json', or 'text/csv', etc.
 * @param textContent All file content as a string
 * @returns Nothing, but should trigger a file download
 */
export function downloadFile({
  fileName = 'file',
  extension = 'json',
  mimeType = 'application/json',
  textContent = '',
}: downloadFileParams = {}): void {
  const file = `${fileName}.${extension}`
  const content = `data:${mimeType};charset=utf-8,${encodeURIComponent(textContent)}`

  const tempElement = document.createElement('a')
  tempElement.setAttribute('href', content)
  tempElement.setAttribute('download', file)
  document.body.appendChild(tempElement)
  tempElement.click()
  document.body.removeChild(tempElement)
}

/**
 * Forces any non-array value into an array.
 * @param value Any value
 * @returns Value wrapped in an array
 */
export function arrayWrap(value: any): any[] {
  if (!Array.isArray(value)) {
    value = [value]
  }
  return value
}

/**
 * Checks if an object or array has at least one element or property in it.
 * @param value Any object or array
 * @returns Boolean result
 */
export function hasData(value: object | any[]): boolean {
  // For array
  if (value !== null && value !== undefined && Array.isArray(value) && value.length !== 0) {
    return true
  }

  // For object
  if (
    value !== null &&
    value !== undefined &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length !== 0
  ) {
    return true
  }

  return false
}
