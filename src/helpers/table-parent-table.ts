import { AppTable } from '@/constants/data-enums'

export default function getTableParentTable(table: AppTable): AppTable | null {
  return {
    [AppTable.EXAMPLES]: null,
    [AppTable.EXAMPLE_RECORDS]: AppTable.EXAMPLES,
    [AppTable.LOGS]: null,
  }[table]
}
