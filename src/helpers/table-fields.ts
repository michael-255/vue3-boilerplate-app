import { AppTable, Field } from '@/constants/data-enums'

export function getTableFields(table: AppTable): Field[] {
  return {
    [AppTable.EXAMPLES]: [Field.ID, Field.CREATED_DATE, Field.NAME, Field.DESCRIPTION],
    [AppTable.EXAMPLE_RECORDS]: [Field.ID, Field.CREATED_DATE, Field.PARENT_ID, Field.VALUE],
    [AppTable.LOGS]: [
      Field.ID,
      Field.CREATED_DATE,
      Field.SEVERITY,
      Field.DETAILS,
      Field.NAME,
      Field.MESSAGE,
      Field.STACK,
    ],
  }[table]
}
