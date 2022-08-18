import type { AppTable, Field } from '@/constants/data-enums'
import type { ColumnProps } from '@/constants/types-interfaces'
import getFieldColumnProps from './field-column-props'
import getTableFields from './table-fields'

export default function getTableColumns(table: AppTable, type: 'props' | 'options'): ColumnProps[] {
  const tableFields = getTableFields(table)

  if (tableFields) {
    if (type === 'props') {
      return tableFields.map((field: Field) => getFieldColumnProps(field))
    } else {
      return tableFields
        .map((field: Field) => getFieldColumnProps(field))
        .filter((col: ColumnProps) => !col.required)
    }
  } else {
    return []
  }
}
