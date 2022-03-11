import Dexie from 'dexie'
import type { Table } from 'dexie'
import { LocalDatabaseOptions } from '../app.config'
// Database Stores
import { User, UserStore } from '../models/User'
import type { IUser } from '../models/User'
import { Example, ExampleStore } from '../models/Example'
import type { IExample } from '../models/Example'

export class LocalDatabase extends Dexie {
  // Information for the typing system to help Dexie out
  users!: Table<IUser>
  examples!: Table<IExample>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      ...UserStore,
      ...ExampleStore,
    })

    this.users.mapToClass(User)
    this.examples.mapToClass(Example)
  }

  /* DB wrapper methods here??? */
}

/**
 * Preconfigured LocalDatabase
 */
export const database = new LocalDatabase(LocalDatabaseOptions)
