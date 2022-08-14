import { Strings } from '@/constants/ui-enums'

/**
 * Logger that adds some style to your console.
 * @param name Logger name appearing in the console
 */
export class Logger {
  private name: string
  private style: {
    log: string
    debug: string
    info: string
    warn: string
    error: string
    critical: string
  }

  constructor(name = 'Logger') {
    this.name = `%c${name}`

    const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white;'
    this.style = {
      log: `${baseStyle} background-color: #607D8B;`, // blue-grey
      debug: `${baseStyle} background-color: #673AB7;`, // deep-purple
      info: `${baseStyle} background-color: #1976D2;`, // primary
      warn: `${baseStyle} background-color: #EF6C00;`, // orange-9
      error: `${baseStyle} background-color: #C10015;`, // negative
      critical: `${baseStyle} background-color: #FF1744;`, // red-13
    }
  }

  log(message: any, ...args: any): void {
    console.log(this.name, this.style.log, message, ...args)
  }

  debug(message: any, ...args: any): void {
    console.log(this.name, this.style.debug, message, ...args)
  }

  info(message: any, ...args: any): void {
    console.log(this.name, this.style.info, message, ...args)
  }

  warn(message: any, ...args: any): void {
    console.warn(this.name, this.style.warn, message, ...args)
  }

  error(message: any, ...args: any): void {
    console.error(this.name, this.style.error, message, ...args)
  }

  critical(message: any, ...args: any): void {
    console.error(this.name, this.style.critical, message, ...args)
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
export const logger = new Logger(Strings.APP_NAME)
