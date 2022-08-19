import { Field } from '@/constants/data-enums'
import { isoToDisplayDate } from '@/utils/luxon'
import { truncateString } from '@/utils/common'
import type { ColumnProps } from '@/constants/types-interfaces'

/**
 * Get field display properties for columns in QTables.
 * @param field
 * @returns Object with properties for QTable columns
 */
export function getFieldColumnProps(field: Field): ColumnProps {
  /**
   * @see
   * MUST ADD NEW FIELDS BELOW
   */
  return {
    [Field.ID]: {
      name: Field.ID,
      label: 'Id',
      align: 'left',
      sortable: true,
      required: true,
      field: (row: any) => row[Field.ID],
      format: (val: string) => val,
    },
    [Field.CREATED_DATE]: {
      name: Field.CREATED_DATE,
      label: 'Created Date',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.CREATED_DATE],
      format: (val: string) => isoToDisplayDate(val),
    },
    [Field.NAME]: {
      name: Field.NAME,
      label: 'Name',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.NAME],
      format: (val: string) => truncateString(val),
    },
    [Field.DESCRIPTION]: {
      name: Field.DESCRIPTION,
      label: 'Description',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.DESCRIPTION],
      format: (val: string) => truncateString(val),
    },
    // [Field.ROUNDS]: {
    //   name: Field.ROUNDS,
    //   label: 'Rounds',
    //   align: 'left',
    //   sortable: true,
    //   required: false,
    //   field: (row: any) => row[Field.ROUNDS],
    //   format: (val: string) => truncateString(val),
    // },
    [Field.PARENT_ID]: {
      name: Field.PARENT_ID,
      label: 'Parent',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.PARENT_ID],
      format: (val: string) => val,
    },
    [Field.KEY]: {
      name: Field.KEY,
      label: 'Key',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.KEY],
      format: (val: string) => val,
    },
    [Field.VALUE]: {
      name: Field.VALUE,
      label: 'Value',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.VALUE],
      format: (val: boolean | string | number) => val,
    },
    [Field.NUMBER]: {
      name: Field.NUMBER,
      label: 'Number',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.NUMBER],
      format: (val: number) => val,
    },
    [Field.SEVERITY]: {
      name: Field.SEVERITY,
      label: 'Severity',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.SEVERITY],
      format: (val: string) => val,
    },
    [Field.DETAILS]: {
      name: Field.DETAILS,
      label: 'Details',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.DETAILS],
      format: (val: string) => truncateString(val),
    },
    [Field.MESSAGE]: {
      name: Field.MESSAGE,
      label: 'Messages',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.MESSAGE],
      format: (val: string) => truncateString(val),
    },
    [Field.STACK]: {
      name: Field.STACK,
      label: 'Stack',
      align: 'left',
      sortable: true,
      required: false,
      field: (row: any) => row[Field.STACK],
      format: (val: string) => truncateString(val),
    },
  }[field]
}
