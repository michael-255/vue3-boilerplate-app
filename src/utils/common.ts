type downloadFileParams = {
  fileName?: string
  extension?: string
  mimeType?: string
  textContent?: string
}

/**
 * Simple file download function for web apps.
 * @param obj.fileName Name of file
 * @param obj.extension File extension
 * @param obj.mimeType Options like: 'application/json', or 'text/csv', etc.
 * @param obj.textContent All file content as a string
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
 * Checks if the object has at least one property in it.
 * @param obj Any object
 * @returns Boolean result
 */
export function isDataInObject(obj: object): boolean {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.keys(obj).length !== 0
  )
}

/**
 * Checks if the array has at least one element in it.
 * @param arr Any array
 * @returns Boolean result
 */
export function isDataInArray(arr: any[]): boolean {
  return arr !== null && arr !== undefined && Array.isArray(arr) && arr.length !== 0
}

/**
 * Truncates a string if it exceeds the provided length.
 * @param str String to be truncated
 * @param len Max length of truncated string
 * @returns Truncated string with a '...' at the end
 */
export function truncateString(
  str: string | null | undefined,
  len = 40,
  ending: '...' | '*' = '...'
): string {
  if (str) {
    if (str.length <= len) {
      return str
    } else {
      return str.slice(0, len) + ending
    }
  }
  return '-'
}
