enum DBTable {
  EXERCISES = 'exercises',
  EXERCISE_RECORDS = 'exerciseRecords',
}

enum Field {
  ID = 'id',
  CREATED_DATE = 'createdDate',
  NAME = 'name',
  DESCRIPTION = 'description',
  NOTES = 'notes',
}

export function useTableInterface(dbTable: DBTable) {
  /**
   * Selects the table interface based on the database table.
   */
  const table = {
    [DBTable.EXERCISES]: {
      name: DBTable.EXERCISES,
      relatedTable: DBTable.EXERCISE_RECORDS,
      label: tableLabels('Exercise', 'Exercises'),
      actions: null,
      fields: tableFields(dbTable),
      rows: [1, 2, 3, 4, 5], //await database.getAll(table)
      columns: () => tableColumns(dbTable),
      columnOptions: () => tableColumns(dbTable).filter((i: any) => i.name !== Field.ID),
      visibleColumns: () => [],
    },
    [DBTable.EXERCISE_RECORDS]: {
      name: DBTable.EXERCISE_RECORDS,
      relatedTable: DBTable.EXERCISES,
      label: tableLabels('Exercise Record', 'Exercise Records'),
      actions: null,
      fields: tableFields(dbTable),
      rows: [1, 2, 3, 4, 5], //await database.getAll(table)
      columns: () => tableColumns(dbTable),
      columnOptions: () => tableColumns(dbTable).filter((i: any) => i.name !== Field.ID),
      visibleColumns: () => [],
    },
  }[dbTable]

  //
  // Internal table interface functions
  //

  function fields(field: Field) {
    return {
      [Field.ID]: {
        inputType: 'text',
        name: Field.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [Field.CREATED_DATE]: {
        inputType: 'text',
        name: Field.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [Field.NAME]: {
        inputType: 'text',
        name: Field.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [Field.DESCRIPTION]: {
        inputType: 'text',
        name: Field.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [Field.NOTES]: {
        inputType: 'text',
        name: Field.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
    }[field]
  }

  function tableFields(table: DBTable) {
    return {
      [DBTable.EXERCISES]: [Field.ID, Field.CREATED_DATE, Field.NAME, Field.DESCRIPTION],
      [DBTable.EXERCISE_RECORDS]: [Field.ID, Field.CREATED_DATE, Field.NOTES],
    }[table]
  }

  function tableLabels(singular: string, plural: string): (x: 'singular' | 'plural') => string {
    return (labelType: 'singular' | 'plural'): string => {
      return { singular, plural }[labelType]
    }
  }

  function tableColumns(table: DBTable): { [x: string]: any }[] {
    return tableFields(table).map((field: any) => fields(field))
  }

  /*
  function getExerciseActions() {
    return {
      create: () => console.log('create'),
      edit: () => console.log('edit'),
      details: getDetailsAction,
      delete: getDeleteAction,
      report: () => console.log('report'),
    }
  }
  */

  return {
    table,
    [dbTable + 'Table']: table, // Named output if needed
  }
}
