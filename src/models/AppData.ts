import type { Example } from '@/models/Example'
import type { Log } from '@/models/Log'
import type { ExampleRecord } from './ExampleRecord'

interface AppDataParams {
  examples?: Example[]
  exampleRecords?: ExampleRecord[]
  logs?: Log[]
}

/**
 * AppData Class
 * @param obj AppDataParams
 */
export class AppData {
  examples: Example[]
  exampleRecords: ExampleRecord[]
  logs: Log[]

  constructor({ examples = [], exampleRecords = [], logs = [] }: AppDataParams = {}) {
    this.examples = examples
    this.exampleRecords = exampleRecords
    this.logs = logs
  }
}
