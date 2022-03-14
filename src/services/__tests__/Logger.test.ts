import { describe, test, expect, spyOn, beforeEach, vi } from 'vitest'
import { Logger } from '../Logger'

describe('Logger', () => {
  const loggerName = 'TestLogger'
  const css = 'border-radius: 3px; padding: 2px 4px; color: white; background-color:'
  const logger = new Logger({ name: loggerName })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should call console.log function when using logger.log', () => {
    const logSpy = spyOn(console, 'log')
    logger.log('log')
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${css} #2196F3;`, 'log')
  })

  test('should call console.warn function when using logger.warn', () => {
    const logSpy = spyOn(console, 'warn')
    logger.warn('warn')
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${css} #FF9800;`, 'warn')
  })

  test('should call console.error function when using logger.error', () => {
    const logSpy = spyOn(console, 'error')
    logger.error('error')
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${css} #F44336;`, 'error')
  })

  test('should call console.trace function when using logger.trace', () => {
    const logSpy = spyOn(console, 'trace')
    logger.trace('trace')
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${css} #2196F3;`, 'trace')
  })

  test('should call console.table function when using logger.table', () => {
    const logSpy = spyOn(console, 'table')
    logger.table('table')
    expect(logSpy).toHaveBeenCalledWith('table')
  })
})
