import { Field } from '@/constants/data-enums'

export interface IEntity {
  id: string
  createdDate: string
}

/**
 *_Entity Class
 * @param params IEntity
 */
export class _Entity {
  id: string
  createdDate: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdDate = params.createdDate
  }

  static getFields(): Field[] {
    return [Field.ID, Field.CREATED_DATE]
  }

  /**
   * @see
   * Implement the following static methods in tail end classes that have been
   * extended from _Entity so they can work properly with certain composables.
   */
  // static getFields(): Field[]
  // static getColumns(): ColumnProps[]
  // static getColumnOptions(): ColumnProps[]
  // static getRelatedTable(): DexieTable | null
  // static getSingularLabel(): string
  // static getPluralLabel(): string
  // static getSupportedOperations(): Operation[]
  // static getVisibleColumns(): Field[]
}
