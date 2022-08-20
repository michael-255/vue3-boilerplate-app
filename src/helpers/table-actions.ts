import { AppTable } from '@/constants/data-enums'
import type { DataObject, TableActions } from '@/constants/types-interfaces'
import { Example } from '@/models/Example'
import { ExampleRecord } from '@/models/ExampleRecord'
import { DB } from '@/services/LocalDatabase'
import { isoToDisplayDate } from '@/utils/luxon'

export function getTableActions(table: AppTable): TableActions {
  return {
    [AppTable.EXAMPLES]: getExampleActions(table),
    [AppTable.EXAMPLE_RECORDS]: getExampleRecordActions(table),
    [AppTable.LOGS]: getLogActions(table),
    [AppTable.SETTINGS]: {},
  }[table]
}

function getExampleActions(table: AppTable): TableActions {
  return {
    getRows: async () => await DB.getAll(table),
    createRow: async (data: DataObject) => {
      await DB.add(
        AppTable.EXAMPLES,
        new Example({
          id: data.id,
          createdDate: data.createdDate,
          name: data.name,
          description: data.description,
        })
      )
    },
    updateRow: async (data: DataObject) => {
      await DB.updateById(AppTable.EXAMPLES, data.originalId, {
        id: data.id,
        createdDate: data.createdDate,
        name: data.name,
        description: data.description,
      })
    },
    generateReport: async (id: string) => {
      const records: ExampleRecord[] = await DB.getByParentId(AppTable.EXAMPLE_RECORDS, id)
      const labels = records.map(() => '')
      const data = records.map((r: ExampleRecord) => r.number)
      const firstDate = isoToDisplayDate(records[0]?.createdDate)
      const lastDate = isoToDisplayDate(records[records.length - 1]?.createdDate)
      return { firstDate, lastDate, labels, data }
    },
  }
}

function getExampleRecordActions(table: AppTable): TableActions {
  return {
    getRows: async () => await DB.getAll(table),
    createRow: async (data: DataObject) => {
      await DB.add(
        AppTable.EXAMPLE_RECORDS,
        new ExampleRecord({
          id: data.id,
          createdDate: data.createdDate,
          parentId: data.parentId,
          number: data.number,
          rounds: JSON.parse(JSON.stringify(data.rounds)), // JSON to fix Dexie cloning error
        })
      )
    },
    updateRow: async (data: DataObject) => {
      console.log(data)
      await DB.updateById(AppTable.EXAMPLE_RECORDS, data.originalId, {
        id: data.id,
        createdDate: data.createdDate,
        parentId: data.parentId,
        number: data.number,
        rounds: data.rounds,
      })
    },
  }
}

function getLogActions(table: AppTable): TableActions {
  return { getRows: async () => await DB.getAll(table) }
}
