import { Field } from '@/constants/data-enums'
import { defineAsyncComponent } from 'vue'
import {
  isIdValid,
  isRequiredDateValid,
  isShortTextValid,
  isLongTextValid,
  isValidNumber,
  isOptionalNumber,
  isDefined,
} from '@/utils/validators'

/**
 * This composable is for determining the behaviour of different Fields.
 */
export function useFields(): { [x: string]: any } {
  /**
   * Get field Vue input component.
   * @param field
   * @returns Lazy loaded Vue Component
   */
  function getFieldComponent(field: Field): any | undefined {
    return {
      [Field.ID]: defineAsyncComponent(() => import('@/components/data-table/inputs/IdInput.vue')),
      [Field.CREATED_DATE]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/CreatedDateInput.vue')
      ),
      [Field.NAME]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/NameInput.vue')
      ),
      [Field.DESCRIPTION]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/DescriptionInput.vue')
      ),
      [Field.ROUNDS]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/RoundsInput.vue')
      ),
      [Field.PARENT_ID]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/ParentIdSelect.vue')
      ),
      [Field.VALUE]: defineAsyncComponent(
        () => import('@/components/data-table/inputs/ValueInput.vue')
      ),
    }[field as string] // As string so fields without a value will return undefined
  }

  /**
   * Get field validator function. True returning function for non-validated fields.
   * @param field
   * @returns Validator function
   */
  function getFieldValidator(field: Field): any | undefined {
    return {
      [Field.ID]: (val: string) => isIdValid(val) || 'Id must be between 1 and 40 characters',
      [Field.CREATED_DATE]: (val: string) =>
        isRequiredDateValid(val) || 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z',
      [Field.NAME]: (val: string) =>
        isShortTextValid(val) || 'Name must be between 1 and 40 characters',
      [Field.DESCRIPTION]: (val: string) =>
        isLongTextValid(val) || 'Description is limited to 500 characters',
      [Field.PARENT_ID]: (val: string) => isDefined(val) || '* Required',
      [Field.VALUE]: (val: number) =>
        isValidNumber(val) || 'Positive number not exceeding 999,999,999 is required',
    }[field as string] // As string so fields without a value will return undefined
  }

  return {
    getFieldValidator,
    getFieldComponent,
  }
}
