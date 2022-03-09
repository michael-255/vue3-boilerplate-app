import { describe, test, expect, spyOn, beforeEach } from 'vitest'
import { Logger } from '../classes/Logger'

describe('Logger', () => {
  test('should have adjusted name string based on name parameter', () => {
    const loggerName = 'TestLogger'
    const logger = new Logger({ name: loggerName })
    expect(logger.name).toBe(`%c${loggerName}`)
  })

  describe('Logger methods', () => {
    let logger: Logger

    beforeEach(() => {
      logger = new Logger()
    })

    test('should call console.log function', () => {
      const logSpy = spyOn(console, 'log')
      logger.log('log')
      expect(logSpy).toHaveBeenCalled()
    })

    test('should call console.warn function', () => {
      const logSpy = spyOn(console, 'warn')
      logger.warn('warn')
      expect(logSpy).toHaveBeenCalled()
    })

    test('should call console.error function', () => {
      const logSpy = spyOn(console, 'error')
      logger.error('error')
      expect(logSpy).toHaveBeenCalled()
    })

    test('should call console.trace function', () => {
      const logSpy = spyOn(console, 'trace')
      logger.trace('trace')
      expect(logSpy).toHaveBeenCalled()
    })

    test('should call console.table function', () => {
      const logSpy = spyOn(console, 'table')
      logger.table('table')
      expect(logSpy).toHaveBeenCalled()
    })
  })
})
