import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { Entity, type IEntity } from '@/models/Entity'

export interface IExampleRecord extends IEntity {
  parentId: string
  value: number
}

export class ExampleRecord extends Entity {
  parentId: string
  value: number

  constructor(params: IExampleRecord) {
    super({ id: params.id, createdDate: params.createdDate })
    this.parentId = params.parentId
    this.value = params.value
  }

  static getTableProperties(): { [x: string]: any } {
    return {
      name: DexieTable.EXAMPLE_RECORDS,
      relatedTable: DexieTable.EXAMPLES,
      labelSingular: 'Example Record',
      labelPlural: 'Example Records',
      actions: {},
      supportedOperations: [
        TableOperation.CREATE,
        TableOperation.UPDATE,
        TableOperation.DELETE,
        TableOperation.CLEAR,
        TableOperation.INSPECT,
      ],
      fields: [TableField.ID, TableField.CREATED_DATE, TableField.PARENT_ID, TableField.VALUE],
      rows: [],
      columns: [],
      columnOptions: [],
      visibleColumns: [TableField.CREATED_DATE],
    }
  }
}
