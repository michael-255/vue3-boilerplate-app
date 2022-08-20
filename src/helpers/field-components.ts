import { Field } from '@/constants/data-enums'
import { defineAsyncComponent } from 'vue'

/**
 * Get field Vue input component.
 * @param field
 * @returns Lazy loaded Vue Component
 */
export function getFieldComponent(field: Field): any {
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
    [Field.ROUNDS]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/RoundsTable.vue')
    ),
    [Field.PARENT_ID]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/ParentIdSelect.vue')
    ),
    [Field.KEY]: null,
    [Field.VALUE]: null,
    [Field.NUMBER]: defineAsyncComponent(
      () => import('@/components/page-table/inputs/NumberInput.vue')
    ),
  }[field as string] // As string so fields without a value will return undefined
}
