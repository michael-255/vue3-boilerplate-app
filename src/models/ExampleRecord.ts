import type { ColumnProps } from '@/constants/types-interfaces'
import { AppTable, Field, Operation } from '@/constants/data-enums'
import { getFieldColumnProps } from '@/helpers/field-column-props'
import { _Entity, type IEntity } from '@/models/_Entity'

export type Round = {
  primary?: number
  secondary?: number
}

export interface IExampleRecord extends IEntity {
  parentId: string
  value: number
  rounds: Round[]
}

/**
 * Example Record Class
 * @param params IExampleRecord
 */
export class ExampleRecord extends _Entity {
  parentId: string
  value: number
  rounds: Round[]

  constructor(params: IExampleRecord) {
    super({ id: params.id, createdDate: params.createdDate })
    this.parentId = params.parentId
    this.value = params.value
    this.rounds = params.rounds
  }

  static getFields(): Field[] {
    return [..._Entity.getFields(), Field.PARENT_ID, Field.VALUE, Field.ROUNDS]
  }

  static getColumns(): ColumnProps[] {
    return this.getFields().map((field: Field) => getFieldColumnProps(field))
  }

  static getColumnOptions(): ColumnProps[] {
    return this.getColumns().filter((col: ColumnProps) => !col.required)
  }

  static getRelatedTable(): AppTable {
    return AppTable.EXAMPLES
  }

  static getSingularLabel(): 'Example Record' {
    return 'Example Record'
  }

  static getPluralLabel(): 'Example Records' {
    return 'Example Records'
  }

  static getSupportedOperations(): Operation[] {
    return [
      Operation.CREATE,
      Operation.UPDATE,
      Operation.DELETE,
      Operation.CLEAR,
      Operation.INSPECT,
    ]
  }

  static getVisibleColumns(): Field[] {
    return [Field.CREATED_DATE]
  }
}
