export enum Milliseconds {
  PERYEAR = 31557600000,
  PERMONTH = 2629800000, // ~30 days
  PERDAY = 86400000,
  PERHOUR = 3600000,
  PERMINUTE = 60000,
  PERSECOND = 1000,
}

export enum Ordinal {
  ST = 'st',
  ND = 'nd',
  RD = 'rd',
  TH = 'th',
}

export const WeekdayShort = Object.freeze(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

export const WeekdayLong = Object.freeze([
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
])

export const MonthShort = Object.freeze([
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
])

export const MonthLong = Object.freeze([
  'January',
  'February ',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

/**
 * Returns an ordinal for an integar parameter.
 * @arg integar
 * @returns Ordinal 'st', 'nd', 'rd', or 'th'
 */
export function getOrdinalString(integar: number): string {
  if (!Number.isInteger(integar)) {
    throw new Error('Parameter must be an integar')
  }

  if (integar > 20 || integar < 10) {
    switch (integar % 10) {
      case 1:
        return Ordinal.ST
      case 2:
        return Ordinal.ND
      case 3:
        return Ordinal.RD
    }
  }
  return Ordinal.TH
}

/**
 * Uses integar milliseconds parameter to build a duration string.
 * @arg milliseconds
 * @returns Duration String format: #d #h #m #s
 */
export function getDurationString(milliseconds: number): string {
  if (!Number.isInteger(milliseconds)) {
    throw new Error('Parameter must be an integar')
  }

  if (milliseconds < 1000) {
    return '-'
  }

  let seconds: number | string = Math.floor((milliseconds / Milliseconds.PERSECOND) % 60)
  let minutes: number | string = Math.floor((milliseconds / Milliseconds.PERMINUTE) % 60)
  let hours: number | string = Math.floor((milliseconds / Milliseconds.PERHOUR) % 24)
  let days: number | string = Math.floor(milliseconds / Milliseconds.PERDAY)

  hours = hours > 0 ? `${hours}h ` : ''
  minutes = minutes > 0 ? `${minutes}m ` : ''
  seconds = seconds > 0 ? `${seconds}s` : ''
  days = days > 0 ? `${days}d ` : ''

  return `${days}${hours}${minutes}${seconds}`.trim()
}

/**
 * Builds a concise display date string from a date.
 * @arg date
 * @returns Date String format: MM/DD/YYYY
 */
export function getShortDateString(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // since the number itself is diplayed
  const day = date.getDate()

  return `${month}/${day}/${year}`
}

/**
 * Builds a medium length display date string from a date.
 * @arg date
 * @returns Date String format: [short weekday], [short month] [day], [year]
 */
export function getMediumDateString(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const weekday = date.getDay()

  return `${WeekdayShort[weekday]}, ${MonthShort[month]} ${day}, ${year}`
}

/**
 * Builds a long detailed display date string from a date.
 * @arg {Date} date
 * @returns Date String format: [long weekday], [long month] [day], [year]
 */
export function getLongDateString(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const weekday = date.getDay()

  return `${WeekdayLong[weekday]}, ${MonthLong[month]} ${day}${getOrdinalString(day)}, ${year}`
}
