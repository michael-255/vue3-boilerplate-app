import { describe, test, expect } from 'vitest'
import { useTable } from '@/use/useTable'
import { AppTable, Operation } from '@/constants/data-enums'

describe('useTable', () => {
  const {
    getFields,
    getRelatedTable,
    getSingularLabel,
    getPluralLabel,
    getSupportedOperations,
    getVisibleColumns,
    getColumns,
    getColumnOptions,
    getActions,
    isSupported,
  } = useTable()

  test('getFields', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getFields(table)).toBeDefined()
    })
  })

  test('getRelatedTable', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getRelatedTable(table)).toBeDefined()
    })
  })

  test('getSingularLabel', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getSingularLabel(table)).toBeDefined()
    })
  })

  test('getPluralLabel', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getPluralLabel(table)).toBeDefined()
    })
  })

  test('getSupportedOperations', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getSupportedOperations(table)).toBeDefined()
    })
  })

  test('getVisibleColumns', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getVisibleColumns(table)).toBeDefined()
    })
  })

  test('getColumns', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getColumns(table)).toBeDefined()
    })
  })

  test('getColumnOptions', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getColumnOptions(table)).toBeDefined()
    })
  })

  test('getActions', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(getActions(table)).toBeDefined()
    })
  })

  test('isSupported', () => {
    const tables = Object.values(AppTable) as AppTable[]
    tables.forEach((table) => {
      expect(isSupported(table)).toBeDefined()
    })

    expect(isSupported(AppTable.EXAMPLES, Operation.NO_OP)).toBe(false)
    expect(isSupported(AppTable.EXAMPLES, Operation.CREATE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLES, Operation.UPDATE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLES, Operation.DELETE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLES, Operation.CLEAR)).toBe(true)
    expect(isSupported(AppTable.EXAMPLES, Operation.INSPECT)).toBe(true)
    expect(isSupported(AppTable.EXAMPLES, Operation.REPORT)).toBe(true)

    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.NO_OP)).toBe(false)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.CREATE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.UPDATE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.DELETE)).toBe(true)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.CLEAR)).toBe(true)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.INSPECT)).toBe(true)
    expect(isSupported(AppTable.EXAMPLE_RECORDS, Operation.REPORT)).toBe(false)

    expect(isSupported(AppTable.LOGS, Operation.NO_OP)).toBe(false)
    expect(isSupported(AppTable.LOGS, Operation.CREATE)).toBe(false)
    expect(isSupported(AppTable.LOGS, Operation.UPDATE)).toBe(false)
    expect(isSupported(AppTable.LOGS, Operation.DELETE)).toBe(true)
    expect(isSupported(AppTable.LOGS, Operation.CLEAR)).toBe(true)
    expect(isSupported(AppTable.LOGS, Operation.INSPECT)).toBe(true)
    expect(isSupported(AppTable.LOGS, Operation.REPORT)).toBe(false)
  })
})
