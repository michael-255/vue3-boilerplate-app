import { AppTable, Operation } from '@/constants/data-enums'

export function getTableOperations(table: AppTable): Operation[] {
  return {
    [AppTable.EXAMPLES]: [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
      Operation.REPORT,
    ],
    [AppTable.EXAMPLE_RECORDS]: [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ],
    [AppTable.LOGS]: [Operation.DELETE, Operation.CLEAR, Operation.INSPECT],
  }[table]
}

/**
 * Check table operation to see if it is supported.
 * @param table
 * @param operation
 * @returns boolean
 */
export function isSupported(table: AppTable, operation: Operation): boolean {
  return {
    [AppTable.EXAMPLES]: getTableOperations(table)?.includes(operation),
    [AppTable.EXAMPLE_RECORDS]: getTableOperations(table)?.includes(operation),
    [AppTable.LOGS]: getTableOperations(table)?.includes(operation),
  }[table]
}
