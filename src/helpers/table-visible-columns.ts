import { AppTable, Field } from '@/constants/data-enums'

export default function getTableParentTable(table: AppTable): Field[] {
  return {
    [AppTable.EXAMPLES]: [Field.CREATED_DATE, Field.NAME],
    [AppTable.EXAMPLE_RECORDS]: [Field.CREATED_DATE],
    [AppTable.LOGS]: [Field.CREATED_DATE, Field.SEVERITY, Field.DETAILS, Field.NAME],
  }[table]
}
