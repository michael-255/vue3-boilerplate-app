import type { DexieTable, TableField } from '@/constants/data-enums'
import { type Ref, ref, provide } from 'vue'

export function useInputProvide(
  injectionKey: TableField,
  dexieTable?: DexieTable
): { [x: string]: any } {
  const model: Ref<any> = ref(null)
  const inputRef: Ref<any> = ref(null)

  /**
   * Access the model ref.
   * @param value
   */
  function updateModel(value: any) {
    model.value = value
  }

  /**
   * Returns the validation status of the input using the inputRef.
   * @returns boolean
   */
  function validate(): boolean {
    return !!inputRef?.value?.validate()
  }

  provide(injectionKey, {
    model,
    inputRef,
    updateModel,
  })

  return {
    table: dexieTable,
    [injectionKey + 'Model']: model,
    [injectionKey + 'Validate']: validate,
  }
}
