import type { TableField } from '@/constants/data-enums'
import { inject } from 'vue'

export function useInputInject(injectionKey: TableField): { [x: string]: any } {
  const { table, inputRef, model, updateModel } = inject(injectionKey) as any

  return {
    table,
    [injectionKey + 'Model']: model,
    [injectionKey + 'InputRef']: inputRef,
    [injectionKey + 'UpdateModel']: updateModel,
  }
}
