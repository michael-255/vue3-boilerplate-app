import type { Example } from '@/models/Example'
import type { ExampleRecord } from './ExampleRecord'
import type { Log } from '@/models/Log'
import type { Setting } from './Setting'

interface AppDataParams {
  examples?: Example[]
  exampleRecords?: ExampleRecord[]
  logs?: Log[]
  settings?: Setting[]
}

/**
 * AppData Class
 * @param obj AppDataParams
 */
export class AppData {
  examples: Example[]
  exampleRecords: ExampleRecord[]
  logs: Log[]
  settings?: Setting[]

  constructor({
    examples = [],
    exampleRecords = [],
    logs = [],
    settings = [],
  }: AppDataParams = {}) {
    this.examples = examples
    this.exampleRecords = exampleRecords
    this.logs = logs
    this.settings = settings
  }
}
