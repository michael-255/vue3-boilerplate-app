import type { ExactField } from './data-enums'

/**
 * Generic type for an object the string based keys storing any value.
 */
export type DataObject = { [x: string]: any }

/**
 * App settings currently only support these values.
 */
export type SettingValue = boolean | string | number

/**
 * Properties used to display data items in a QTable.
 */
export type ColumnProps = {
  name: ExactField
  label: string
  align: string
  sortable: boolean
  required: boolean
  field: (val: any) => any
  format: (val: any) => any
}

/**
 * The actions you can perform on a table row.
 */
export type TableActions = {
  getRows?: () => Promise<any[]>
  createRow?: (x: DataObject) => any
  updateRow?: (x: DataObject) => any
  generateReport?: (id: string) => any
}
