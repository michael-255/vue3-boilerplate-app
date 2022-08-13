import type { ColumnProps } from '@/constants/types-interfaces'
import { DexieTable, Field, Operation } from '@/constants/data-enums'
import { getFieldColumnProps } from '@/helpers/field-column-props'
import { _Entity, type IEntity } from '@/models/_Entity'

export interface IExample extends IEntity {
  name: string
  description: string
  // rounds: any[]
}

export class Example extends _Entity {
  name: string
  description: string
  // rounds: any[]

  constructor(params: IExample) {
    super({ id: params.id, createdDate: params.createdDate })
    this.name = params.name
    this.description = params.description
    // this.rounds = params.rounds
  }

  static getFields(): Field[] {
    return [..._Entity.getFields(), Field.NAME, Field.DESCRIPTION]
  }

  static getColumns(): ColumnProps[] {
    return this.getFields().map((field: Field) => getFieldColumnProps(field))
  }

  static getColumnOptions(): ColumnProps[] {
    return this.getColumns().filter((col: ColumnProps) => !col.required)
  }

  static getRelatedTable(): DexieTable {
    return DexieTable.EXAMPLE_RECORDS
  }

  static getSingularLabel(): 'Example' {
    return 'Example'
  }

  static getPluralLabel(): 'Examples' {
    return 'Examples'
  }

  static getSupportedOperations(): Operation[] {
    return [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
      Operation.REPORT,
    ]
  }

  static getVisibleColumns(): Field[] {
    return [Field.CREATED_DATE]
  }
}
