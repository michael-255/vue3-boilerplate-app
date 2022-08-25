import { ExactField } from '@/constants/data-enums'
import { isoToDisplayDate } from '@/utils/luxon'
import { truncateString } from '@/utils/common'
import type { ColumnProps } from '@/constants/types-interfaces'

/**
 * Field display properties for columns in QTables. There should be one for every class field for
 * classes that pair with a database table.
 * @param exactField
 * @returns Object with properties for QTable columns
 */
export function getExactFieldColumnProps(exactField: ExactField): ColumnProps {
  /**
   * @see
   * MUST ADD NEW EXACT FIELDS BELOW
   */
  return {
    [ExactField.ID]: {
      name: ExactField.ID,
      label: 'Id',
      align: 'left',
      sortable: true,
      required: true,
      field: (row: any) => row[ExactField.ID],
      format: (val: string) => val,
    },
    [ExactField.CREATED_DATE]: {
      name: ExactField.CREATED_DATE,
      label: 'Created Date',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.CREATED_DATE],
      format: (val: string) => isoToDisplayDate(val),
    },
    [ExactField.NAME]: {
      name: ExactField.NAME,
      label: 'Name',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.NAME],
      format: (val: string) => truncateString(val),
    },
    [ExactField.DESCRIPTION]: {
      name: ExactField.DESCRIPTION,
      label: 'Description',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.DESCRIPTION],
      format: (val: string) => truncateString(val),
    },
    [ExactField.PARENT_ID]: {
      name: ExactField.PARENT_ID,
      label: 'Parent',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.PARENT_ID],
      format: (val: string) => val,
    },
    [ExactField.PRIMARY_ROUNDS]: {
      name: ExactField.PRIMARY_ROUNDS,
      label: 'Primary',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.PRIMARY_ROUNDS],
      format: (val: number[]) => truncateString(JSON.stringify(val)),
    },
    [ExactField.SECONDARY_ROUNDS]: {
      name: ExactField.SECONDARY_ROUNDS,
      label: 'Secondary',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.SECONDARY_ROUNDS],
      format: (val: number[]) => truncateString(JSON.stringify(val)),
    },
    [ExactField.KEY]: {
      name: ExactField.KEY,
      label: 'Key',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.KEY],
      format: (val: string) => val,
    },
    [ExactField.VALUE]: {
      name: ExactField.VALUE,
      label: 'Value',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.VALUE],
      format: (val: boolean | string | number) => val,
    },
    [ExactField.NUMBER]: {
      name: ExactField.NUMBER,
      label: 'Number',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.NUMBER],
      format: (val: number) => val,
    },
    [ExactField.SEVERITY]: {
      name: ExactField.SEVERITY,
      label: 'Severity',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.SEVERITY],
      format: (val: string) => val,
    },
    [ExactField.DETAILS]: {
      name: ExactField.DETAILS,
      label: 'Details',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.DETAILS],
      format: (val: string) => truncateString(val),
    },
    [ExactField.MESSAGE]: {
      name: ExactField.MESSAGE,
      label: 'Messages',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.MESSAGE],
      format: (val: string) => truncateString(val),
    },
    [ExactField.STACK]: {
      name: ExactField.STACK,
      label: 'Stack',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[ExactField.STACK],
      format: (val: string) => truncateString(val),
    },
  }[exactField]
}
