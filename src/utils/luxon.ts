import { DateTime } from 'luxon'

/**
 * Converts and outputs the ISO date string as a human readable local date string
 * @param date ISO string
 * @returns Example: Sun Jun 6 2022 1:30:45 PM EDT
 */
export function isoToDisplayDate(date: string): string {
  const luxonDate = DateTime.fromISO(date).toFormat('ccc LLL d yyyy ttt')
  if (!luxonDate || luxonDate === 'Invalid DateTime') {
    return '-'
  }
  return luxonDate
}
