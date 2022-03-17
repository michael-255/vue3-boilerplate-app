import Dexie from 'dexie'
import type { Table } from 'dexie'
// Database Stores
import { User, UserStore } from '../models/User'
import type { IUser } from '../models/User'
import { Example, ExampleStore } from '../models/Example'
import type { IExample } from '../models/Example'

/**
 * Wrapper for Dexie IndexedDB.
 * @param name Database name in the browser dev tools
 */
export class LocalDatabase extends Dexie {
  logger: any
  // Information for the typing system to help Dexie out
  users!: Table<IUser>
  examples!: Table<IExample>

  constructor(name = 'LocalDatabase') {
    super(name)

    this.version(1).stores({
      ...UserStore,
      ...ExampleStore,
    })

    this.users.mapToClass(User)
    this.examples.mapToClass(Example)
  }

  async addUser(user: IUser): Promise<void> {
    await this.users.add(user)
  }

  async addExample(example: IExample): Promise<void> {
    await this.examples.add(example)
  }

  async getAllFromStore(store: string): Promise<any[]> {
    return await this.table(store).toArray()
  }

  async getUserByName(name: string): Promise<IUser | undefined> {
    return await this.users.where('name').equalsIgnoreCase(name).first()
  }

  async getNewestExample(): Promise<IExample | undefined> {
    return await this.examples.orderBy('createdDate').last()
  }

  async getOldestExample(): Promise<IExample | undefined> {
    return await this.examples.orderBy('createdDate').first()
  }
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase('ExampleDatabase')
