import type { Example } from '@/models/Example'
import type { Log } from '@/models/Log'

interface AppDataParams {
  examples?: Example[]
  logs?: Log[]
}

/**
 * AppData Class
 * @param obj AppDataParams
 */
export class AppData {
  examples: Example[]
  logs: Log[]

  constructor({ examples = [], logs = [] }: AppDataParams = {}) {
    this.examples = examples
    this.logs = logs
  }
}
