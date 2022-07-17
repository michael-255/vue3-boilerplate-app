/**
 * Logger that adds some style to your console.
 * @param name Logger name appearing in the console
 */
export class Logger {
  private name: string
  private style: {
    log: string
    warn: string
    error: string
  }

  constructor(name = 'Logger') {
    this.name = `%c${name}`

    const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white;'
    this.style = {
      log: `${baseStyle} background-color: #2196F3;`,
      warn: `${baseStyle} background-color: #FF9800;`,
      error: `${baseStyle} background-color: #F44336;`,
    }
  }

  log(message: any, ...args: any): void {
    console.log(this.name, this.style.log, message, ...args)
  }

  warn(message: any, ...args: any): void {
    console.warn(this.name, this.style.warn, message, ...args)
  }

  error(message: any, ...args: any): void {
    console.error(this.name, this.style.error, message, ...args)
  }

  trace(message: any, ...args: any): void {
    console.trace(this.name, this.style.log, message, ...args)
  }

  table(...args: any): void {
    console.table(...args)
  }
}

/**
 * Preconfigured Logger
 */
export const logger = new Logger('FitnessTracker')
