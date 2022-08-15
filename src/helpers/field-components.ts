import { Field } from '@/constants/data-enums'
import { defineAsyncComponent } from 'vue'

/**
 * Get field Vue input component.
 * @param field
 * @returns Lazy loaded Vue Component
 */
export function getFieldComponent(field: Field): any | undefined {
  return {
    [Field.ID]: defineAsyncComponent(() => import('@/components/page-table/inputs/IdInput.vue')),
    [Field.CREATED_DATE]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/CreatedDateInput.vue')
    ),
    [Field.NAME]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/NameInput.vue')
    ),
    [Field.DESCRIPTION]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/DescriptionInput.vue')
    ),
    // [Field.ROUNDS]: defineAsyncComponent(
    //   () => import('@/components/page-table/inputs/RoundsInput.vue')
    // ),
    [Field.PARENT_ID]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/ParentIdSelect.vue')
    ),
    [Field.VALUE]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/ValueInput.vue')
    ),
  }[field as string] // As string so fields without a value will return undefined
}
