import type { TableField } from '@/constants/data-enums'
import { inject } from 'vue'

export function useInputInject(injectionKey: TableField): { [x: string]: any } {
  /**
   * -----Inject Statement-----
   */
  const { inputRef, model, updateModel } = inject(injectionKey) as any

  return {
    [injectionKey + 'Model']: model,
    [injectionKey + 'InputRef']: inputRef,
    [injectionKey + 'UpdateModel']: updateModel,
  }
}
