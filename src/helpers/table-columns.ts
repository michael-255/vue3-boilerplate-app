import type { AppTable, ExactField } from '@/constants/data-enums'
import type { ColumnProps } from '@/constants/types-interfaces'
import { getExactFieldColumnProps } from '@/helpers/field-column-props'
import { getTableExactFields } from '@/helpers/table-fields'

export function getTableColumns(table: AppTable, type: 'props' | 'options'): ColumnProps[] {
  const tableFields = getTableExactFields(table)

  if (tableFields) {
    if (type === 'props') {
      return tableFields.map((field: ExactField) => getExactFieldColumnProps(field))
    } else {
      return tableFields
        .map((field: ExactField) => getExactFieldColumnProps(field))
        .filter((col: ColumnProps) => !col.required)
    }
  } else {
    return []
  }
}
