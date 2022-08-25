import { InputField } from '@/constants/data-enums'
import { defineAsyncComponent } from 'vue'

/**
 * Vue input component for the specified InputField. Each InputField could be for many ExactFields.
 * @param inputField
 * @returns Lazy loaded Vue Component
 */
export function getInputFieldComponent(inputField: InputField): any {
  return {
    [InputField.ID]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/IdInput.vue')
    ),
    [InputField.CREATED_DATE]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/CreatedDateInput.vue')
    ),
    [InputField.NAME]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/NameInput.vue')
    ),
    [InputField.DESCRIPTION]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/DescriptionInput.vue')
    ),
    [InputField.PARENT_ID]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/ParentIdSelect.vue')
    ),
    [InputField.NUMBER]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/NumberInput.vue')
    ),
    [InputField.ROUNDS]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/RoundsInput.vue')
    ),
  }[inputField]
}
