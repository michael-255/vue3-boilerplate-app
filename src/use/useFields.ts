import { TableField } from '@/constants/data-enums'
import { truncateString } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import { isoToDisplayDate } from '@/utils/luxon'
import {
  isIdValid,
  isRequiredDateValid,
  isShortTextValid,
  isTextValid,
  isOptionalNumber,
} from '@/utils/validators'

/**
 * This composable is for determining the behaviour of different TableFields.
 */
export function useFields() {
  /**
   * Get field display properties for columns in QTables.
   * @param tableField
   * @returns Object with properties for QTable columns
   */
  function getFieldDisplayProperties(tableField: TableField): { [x: string]: any } | undefined {
    return {
      [TableField.ID]: {
        name: TableField.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
      },
      [TableField.CREATED_DATE]: {
        name: TableField.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.createdDate,
        format: (val: string) => isoToDisplayDate(val),
      },
      [TableField.NAME]: {
        name: TableField.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.name,
        format: (val: string) => truncateString(val),
      },
      [TableField.DESCRIPTION]: {
        name: TableField.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.description,
        format: (val: string) => truncateString(val),
      },
      [TableField.PARENT_ID]: {
        name: TableField.PARENT_ID,
        label: 'Parent',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.parentId,
        format: (val: string) => val,
      },
      [TableField.NOTES]: {
        name: TableField.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => truncateString(val),
      },
      [TableField.VALUE]: {
        name: TableField.VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.value,
        format: (val: number) => val,
      },
      [TableField.SEVERITY]: {
        name: TableField.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.severity,
        format: (val: string) => val,
      },
      [TableField.CALLER_DETAILS]: {
        name: TableField.CALLER_DETAILS,
        label: 'Caller Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.callerDetails,
        format: (val: string) => truncateString(val),
      },
      [TableField.ERROR_NAME]: {
        name: TableField.ERROR_NAME,
        label: 'Error Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.errorName,
        format: (val: string) => truncateString(val),
      },
      [TableField.MESSAGE]: {
        name: TableField.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.message,
        format: (val: string) => truncateString(val),
      },
      [TableField.STACK]: {
        name: TableField.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.stack,
        format: (val: string) => truncateString(val),
      },
    }[tableField as string] // As string so fields without a value will return undefined
  }

  /**
   * Get field validator function.
   * @param tableField
   * @returns Validator function
   */
  function getFieldValidator(tableField: TableField): ((x: any) => any) | undefined {
    return {
      [TableField.ID]: (val: string) => isIdValid(val),
      [TableField.CREATED_DATE]: (val: string) => isRequiredDateValid(val),
      [TableField.NAME]: (val: string) => isShortTextValid(val),
      [TableField.DESCRIPTION]: (val: string) => isTextValid(val),
      [TableField.NOTES]: (val: string) => isTextValid(val),
      [TableField.VALUE]: (val: number | undefined) => isOptionalNumber(val),
    }[tableField as string] // As string so fields without a value will return undefined
  }

  /**
   * Get field Vue input component.
   * @param tableField
   * @returns Lazy loaded Vue Component
   */
  function getFieldComponent(tableField: TableField): any | undefined {
    return {
      [TableField.ID]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.CREATED_DATE]: defineAsyncComponent(
        () => import('@/components/inputs/CreatedDateInput.vue')
      ),
      [TableField.NAME]: defineAsyncComponent(() => import('@/components/inputs/NameInput.vue')),
      [TableField.DESCRIPTION]: defineAsyncComponent(
        () => import('@/components/inputs/DescriptionInput.vue')
      ),
      [TableField.PARENT_ID]: defineAsyncComponent(
        () => import('@/components/inputs/ParentIdSelect.vue')
      ),
      [TableField.NOTES]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.VALUE]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
    }[tableField as string] // As string so fields without a value will return undefined
  }

  return {
    getFieldDisplayProperties,
    getFieldValidator,
    getFieldComponent,
  }
}
