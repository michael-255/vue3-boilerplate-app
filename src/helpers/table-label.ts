import { AppTable } from '@/constants/data-enums'

/**
 * Gets the singular or plural label for a table.
 * @param table
 * @param type
 * @returns The label string
 */
export function getTableLabel(table: AppTable, type: 'singular' | 'plural'): string {
  if (type === 'singular') {
    return {
      [AppTable.EXAMPLES]: 'Example',
      [AppTable.EXAMPLE_RECORDS]: 'Example Record',
      [AppTable.LOGS]: 'Log',
      [AppTable.SETTINGS]: 'Setting',
    }[table]
  } else {
    return {
      [AppTable.EXAMPLES]: 'Examples',
      [AppTable.EXAMPLE_RECORDS]: 'Example Records',
      [AppTable.LOGS]: 'Logs',
      [AppTable.SETTINGS]: 'Settings',
    }[table]
  }
}
