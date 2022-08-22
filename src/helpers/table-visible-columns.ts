import { AppTable, ExactField } from '@/constants/data-enums'

export function getTableVisibleColumns(table: AppTable): ExactField[] {
  return {
    [AppTable.EXAMPLES]: [ExactField.CREATED_DATE, ExactField.NAME],
    [AppTable.EXAMPLE_RECORDS]: [ExactField.CREATED_DATE, ExactField.NUMBER],
    [AppTable.LOGS]: [
      ExactField.CREATED_DATE,
      ExactField.SEVERITY,
      ExactField.DETAILS,
      ExactField.NAME,
    ],
    [AppTable.SETTINGS]: [],
  }[table]
}
