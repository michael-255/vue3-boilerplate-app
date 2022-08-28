import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a random id using the UUID package.
 * @returns Random 36 (including dashes) character id
 */
export function uuid(): string {
  return uuidv4()
}

/**
 * Generates a custom id based on parameters.
 * @param obj.segmentLengths Array of segment lengths (recommend 1-8 each)
 * @param obj.delimiter Single string character delimiter for id segments
 * @returns Custom random id
 */
export function customId({
  segmentLengths = [4, 4, 4],
  delimiter = '-',
}: { segmentLengths?: number[]; delimiter?: string } = {}): string {
  if (segmentLengths.length < 1) {
    throw new Error('segmentLengths parameter must have at least one element')
  } else if (segmentLengths.some((el) => typeof el !== 'number' || el < 1)) {
    throw new Error('segmentLengths elements must be positive numbers')
  } else if (typeof delimiter !== 'string' || delimiter.length > 1) {
    throw new Error('delimiter must be a string of length 1 or an empty string')
  }

  const createIdSegment = (len: number): string => {
    // Note: Math.random only consistently produces 8 unique base 36 characters
    return Math.random()
      .toString(36)
      .substring(2, len + 2) // Adjusted to account for 2 trimmed characters
      .padEnd(len, 'X') // Ensures length is always reached with filler X's
  }

  let idStr = ''

  segmentLengths.forEach((segLen: number) => {
    idStr += `${createIdSegment(Math.floor(segLen))}${delimiter}`
  })

  if (delimiter) {
    idStr = idStr.slice(0, -1) // remove last delimitter
  }

  return idStr.toUpperCase()
}
