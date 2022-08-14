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

export type ActionData = { [x: string]: any }

export type TableActions = {
  getRows?: () => Promise<any[]>
  createRow?: (x: ActionData) => any
  updateRow?: (x: ActionData) => any
  generateReport?: (id: string) => any
}
