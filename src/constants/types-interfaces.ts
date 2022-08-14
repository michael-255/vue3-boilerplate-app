import type { Field } from '@/constants/data-enums'

export type ColumnProps = {
  name: Field
  label: string
  align: string
  sortable: boolean
  required: boolean
  field: (val: any) => any
  format: (val: any) => any
}

export type DataObject = { [x: string]: any }

export type TableActions = {
  getRows?: () => Promise<any[]>
  createRow?: (x: DataObject) => any
  updateRow?: (x: DataObject) => any
  generateReport?: (id: string) => any
}

export type SettingValue = boolean | string | number
