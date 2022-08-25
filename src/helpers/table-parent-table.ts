import { AppTable } from '@/constants/data-enums'

/**
 * Gets the parent table for a table if it has one.
 * @param table
 * @returns AppTable or null
 */
export function getTableParentTable(table: AppTable): AppTable | null {
  return {
    [AppTable.EXAMPLES]: null,
    [AppTable.EXAMPLE_RECORDS]: AppTable.EXAMPLES,
    [AppTable.LOGS]: null,
    [AppTable.SETTINGS]: null,
  }[table]
}
