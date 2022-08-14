import Dexie, { type IndexableType, type Table } from 'dexie'
import { DexieTable } from '@/constants/data-enums'
import { Example, type IExample } from '@/models/Example'
import { ExampleRecord, type IExampleRecord } from '@/models/ExampleRecord'
import { Log, type ILog } from '@/models/Log'
import { Setting, type ISetting } from '@/models/Setting'
import { Strings } from '@/constants/ui-enums'

/**
 * Wrapper for Dexie IndexedDB
 * @param name Database name
 */
export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  // REQUIRED
  [DexieTable.EXAMPLES]!: Table<IExample>;
  [DexieTable.EXAMPLE_RECORDS]!: Table<IExampleRecord>;
  [DexieTable.SETTINGS]!: Table<ISetting>;
  [DexieTable.LOGS]!: Table<ILog>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      // REQUIRED
      [DexieTable.EXAMPLES]: '&id, name',
      [DexieTable.EXAMPLE_RECORDS]: '&id, parentId',
      [DexieTable.SETTINGS]: '&id',
      [DexieTable.LOGS]: '&id',
    })

    // REQUIRED
    this[DexieTable.EXAMPLES].mapToClass(Example)
    this[DexieTable.EXAMPLE_RECORDS].mapToClass(ExampleRecord)
    this[DexieTable.SETTINGS].mapToClass(Setting)
    this[DexieTable.LOGS].mapToClass(Log)
  }

  /**
   * Get all items from table.
   * @param table
   * @returns Array of all table items
   */
  async getAll<T>(table: DexieTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  /**
   * Get item from table by id.
   * @param table
   * @param id
   * @returns Single item or undefined
   */
  async getById<T>(table: DexieTable, id: string): Promise<T | undefined> {
    return await this.table(table).where('id').equalsIgnoreCase(id).first()
  }

  /**
   * Get items from table by name.
   * @param table
   * @param name
   * @returns Array of items
   */
  async getByName<T>(table: DexieTable, name: string): Promise<T[]> {
    return await this.table(table).where('name').equalsIgnoreCase(name).toArray()
  }

  /**
   * Get items from table by parentId.
   * @param table
   * @param parentId
   * @returns Array of items
   */
  async getByParentId<T>(table: DexieTable, parentId: string): Promise<T[]> {
    return await this.table(table)
      .where('parentId')
      .equalsIgnoreCase(parentId)
      .sortBy('createdDate')
  }

  /**
   * Get newest item from table by parentId.
   * @param table
   * @param parentId
   * @returns Newest item or undefined
   */
  async getNewestByParentId<T>(table: DexieTable, parentId: string): Promise<T | undefined> {
    return (
      await this.table(table).where('parentId').equalsIgnoreCase(parentId).sortBy('createdDate')
    ).reverse()[0]
  }

  /**
   * Get items from table by array of ids.
   * @param table
   * @param ids
   * @returns Array of items
   */
  async bulkGetByIds<T>(table: DexieTable, ids: string[]): Promise<T[]> {
    // Filters out falsy values
    return (await this.table(table).bulkGet(ids)).filter(Boolean)
  }

  /**
   * Delete item in table by id.
   * @param table
   * @param id
   * @returns undefined even if nothing was deleted
   */
  async deleteById<T>(table: DexieTable, id: string): Promise<T | undefined> {
    const itemToDelete: T | undefined = await this.table(table)
      .where('id')
      .equalsIgnoreCase(id)
      .first()

    if (itemToDelete) {
      await this.table(table).delete(id)
      return itemToDelete
    } else {
      return undefined
    }
  }

  /**
   * Clears all items from table.
   * @param table
   * @returns undefined
   */
  async clear(table: DexieTable): Promise<void> {
    return await this.table(table).clear()
  }

  /**
   * Add item to table.
   * @param table
   * @param item
   * @returns Id of new item
   */
  async add<T>(table: DexieTable, item: T): Promise<IndexableType> {
    return await this.table(table).add(item)
  }

  /**
   * Add items to table.
   * @param table
   * @param items
   * @returns Array of new item ids
   */
  async bulkAdd<T>(table: DexieTable, items: T[]): Promise<IndexableType[]> {
    return await this.table(table).bulkAdd(items, { allKeys: true })
  }

  /**
   * Update provided properties on table item by id.
   * @param table
   * @param id
   * @param props
   * @returns 1 on a successful update
   */
  async updateById<T>(table: DexieTable, id: string, props: Partial<T>): Promise<IndexableType> {
    return await this.table(table).update(id, props)
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const DB = new LocalDatabase(Strings.APP_NAME)
