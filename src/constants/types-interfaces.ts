import type { ExactField } from './data-enums'

/**
 * @todo
 */
export type DataObject = { [x: string]: any }

/**
 * @todo
 */
export type SettingValue = boolean | string | number

/**
 * @todo
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
 * @todo
 */
export type TableActions = {
  getRows?: () => Promise<any[]>
  createRow?: (x: DataObject) => any
  updateRow?: (x: DataObject) => any
  generateReport?: (id: string) => any
}
