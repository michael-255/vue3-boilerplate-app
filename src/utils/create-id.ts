import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a random id using the UUID package.
 * @returns Random 36 (including dashes) character id
 */
export function createId(): string {
  return uuidv4()
}
