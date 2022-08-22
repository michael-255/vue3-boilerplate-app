import { AppTable, ExactField, InputField } from '@/constants/data-enums'

export function getTableExactFields(table: AppTable): ExactField[] {
  return {
    [AppTable.EXAMPLES]: [
      ExactField.ID,
      ExactField.CREATED_DATE,
      ExactField.NAME,
      ExactField.DESCRIPTION,
    ],
    [AppTable.EXAMPLE_RECORDS]: [
      ExactField.ID,
      ExactField.CREATED_DATE,
      ExactField.PARENT_ID,
      ExactField.NUMBER,
      ExactField.PRIMARY_ROUNDS,
      ExactField.SECONDARY_ROUNDS,
    ],
    [AppTable.LOGS]: [
      ExactField.ID,
      ExactField.CREATED_DATE,
      ExactField.SEVERITY,
      ExactField.DETAILS,
      ExactField.NAME,
      ExactField.MESSAGE,
      ExactField.STACK,
    ],
    [AppTable.SETTINGS]: [ExactField.KEY, ExactField.VALUE],
  }[table]
}

export function getTableInputFields(table: AppTable): InputField[] {
  return {
    [AppTable.EXAMPLES]: [
      InputField.ID,
      InputField.CREATED_DATE,
      InputField.NAME,
      InputField.DESCRIPTION,
    ],
    [AppTable.EXAMPLE_RECORDS]: [
      InputField.ID,
      InputField.CREATED_DATE,
      InputField.PARENT_ID,
      InputField.NUMBER,
      InputField.ROUNDS,
    ],
    [AppTable.LOGS]: [],
    [AppTable.SETTINGS]: [],
  }[table]
}
