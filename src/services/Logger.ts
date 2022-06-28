import { DEBUG } from '../constants'

type styleProps = {
  log: string
  warn: string
  error: string
}

type loggerParams = {
  name?: string
  debug?: boolean
}

/**
 * Logger that adds some style to your console.
 * @param name Logger name appearing in the console
 * @param debug Debug boolean hides logger messages when false
 */
export class Logger {
  private name: string
  private debug: boolean
  private style: styleProps

  constructor({ name = 'Logger', debug = true }: loggerParams = {}) {
    this.name = `%c${name}`
    this.debug = !!debug

    const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white;'
    this.style = {
      log: `${baseStyle} background-color: #2196F3;`,
      warn: `${baseStyle} background-color: #FF9800;`,
      error: `${baseStyle} background-color: #F44336;`,
    }
  }

  log(message: any, ...args: any): void {
    if (this.debug) {
      console.log(this.name, this.style.log, message, ...args)
    }
  }

  warn(message: any, ...args: any): void {
    if (this.debug) {
      console.warn(this.name, this.style.warn, message, ...args)
    }
  }

  error(message: any, ...args: any): void {
    if (this.debug) {
      console.error(this.name, this.style.error, message, ...args)
    }
  }

  trace(message: any, ...args: any): void {
    if (this.debug) {
      console.trace(this.name, this.style.log, message, ...args)
    }
  }

  table(...args: any): void {
    if (this.debug) {
      console.table(...args)
    }
  }
}

/**
 * Preconfigured Logger
 */
export const logger = new Logger({
  name: 'ExampleLogger',
  debug: DEBUG,
})
