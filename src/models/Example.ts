import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { Entity, type IEntity } from '@/models/Entity'

export interface IExample extends IEntity {
  name: string
  description: string
  // rounds: any[]
}

export class Example extends Entity {
  name: string
  description: string
  // rounds: any[]

  constructor(params: IExample) {
    super({ id: params.id, createdDate: params.createdDate })
    this.name = params.name
    this.description = params.description
    // this.rounds = params.rounds
  }

  static getTableProperties(): { [x: string]: any } {
    return {
      name: DexieTable.EXAMPLES,
      relatedTable: DexieTable.EXAMPLE_RECORDS,
      labelSingular: 'Example',
      labelPlural: 'Examples',
      actions: {},
      supportedOperations: [
        TableOperation.CREATE,
        TableOperation.UPDATE,
        TableOperation.DELETE,
        TableOperation.CLEAR,
        TableOperation.INSPECT,
        TableOperation.REPORT,
      ],
      fields: [TableField.ID, TableField.CREATED_DATE, TableField.NAME, TableField.DESCRIPTION],
      rows: [],
      columns: [],
      columnOptions: [],
      visibleColumns: [TableField.CREATED_DATE],
    }
  }
}
