import { Field } from '@/constants/data-enums'
import { truncateString } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import { isoToDisplayDate } from '@/utils/luxon'
import {
  isIdValid,
  isRequiredDateValid,
  isShortTextValid,
  isTextValid,
  isRequiredNumber,
  isRequired,
} from '@/utils/validators'

/**
 * This composable is for determining the behaviour of different Fields.
 */
export function useFields() {
  /**
   * Get field display properties for columns in QTables.
   * @param field
   * @returns Object with properties for QTable columns
   */
  function getFieldDisplayProperties(field: Field): { [x: string]: any } | undefined {
    return {
      [Field.ID]: {
        name: Field.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
      },
      [Field.CREATED_DATE]: {
        name: Field.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.createdDate,
        format: (val: string) => isoToDisplayDate(val),
      },
      [Field.NAME]: {
        name: Field.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.name,
        format: (val: string) => truncateString(val),
      },
      [Field.DESCRIPTION]: {
        name: Field.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.description,
        format: (val: string) => truncateString(val),
      },
      [Field.PARENT_ID]: {
        name: Field.PARENT_ID,
        label: 'Parent',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.parentId,
        format: (val: string) => val,
      },
      [Field.NOTES]: {
        name: Field.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => truncateString(val),
      },
      [Field.VALUE]: {
        name: Field.VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.value,
        format: (val: number) => val,
      },
      [Field.SEVERITY]: {
        name: Field.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.severity,
        format: (val: string) => val,
      },
      [Field.CALLER_DETAILS]: {
        name: Field.CALLER_DETAILS,
        label: 'Caller Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.callerDetails,
        format: (val: string) => truncateString(val),
      },
      [Field.ERROR_NAME]: {
        name: Field.ERROR_NAME,
        label: 'Error Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.errorName,
        format: (val: string) => truncateString(val),
      },
      [Field.MESSAGE]: {
        name: Field.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.message,
        format: (val: string) => truncateString(val),
      },
      [Field.STACK]: {
        name: Field.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.stack,
        format: (val: string) => truncateString(val),
      },
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
        isTextValid(val) || 'Description is limited to 500 characters',
      [Field.PARENT_ID]: (val: string) => isRequired(val) || '* Required',
      [Field.VALUE]: (val: number) =>
        isRequiredNumber(val) || 'Positive number not exceeding 999,999,999 is required',
      [Field.NOTES]: isTextValid,
    }[field as string] // As string so fields without a value will return undefined
  }

  /**
   * Get field Vue input component.
   * @param field
   * @returns Lazy loaded Vue Component
   */
  function getFieldComponent(field: Field): any | undefined {
    return {
      [Field.ID]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [Field.CREATED_DATE]: defineAsyncComponent(
        () => import('@/components/inputs/CreatedDateInput.vue')
      ),
      [Field.NAME]: defineAsyncComponent(() => import('@/components/inputs/NameInput.vue')),
      [Field.DESCRIPTION]: defineAsyncComponent(
        () => import('@/components/inputs/DescriptionInput.vue')
      ),
      [Field.PARENT_ID]: defineAsyncComponent(
        () => import('@/components/inputs/ParentIdSelect.vue')
      ),
      [Field.VALUE]: defineAsyncComponent(() => import('@/components/inputs/ValueInput.vue')),
      [Field.NOTES]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
    }[field as string] // As string so fields without a value will return undefined
  }

  return {
    getFieldDisplayProperties,
    getFieldValidator,
    getFieldComponent,
  }
}
