import { describe, test, expect, spyOn, beforeEach, vi } from 'vitest'
import { Logger } from '@/services/Logger'

describe('Logger', () => {
  const loggerName = 'TestLogger'
  const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white;'
  const logBg = 'background-color: #607D8B;'
  const debugBg = 'background-color: #673AB7;'
  const infoBg = 'background-color: #1976D2;'
  const warnBg = 'background-color: #EF6C00;'
  const errorBg = 'background-color: #C10015;'
  const criticalBg = 'background-color: #FF1744;'
  const logMessage = 'LOG'
  const debugMessage = 'DEBUG'
  const infoMessage = 'INFO'
  const warnMessage = 'WARNING'
  const errorMessage = 'ERROR'
  const criticalMessage = 'CRITICAL'
  const logger = new Logger(loggerName)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('logger.log calls console.log with styles and parameters', () => {
    const logSpy = spyOn(console, 'log')
    logger.log(logMessage)
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${logBg}`, logMessage)
  })

  test('logger.debug calls console.log with styles and parameters', () => {
    const logSpy = spyOn(console, 'log')
    logger.debug(debugMessage)
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${debugBg}`, debugMessage)
  })

  test('logger.info calls console.log with styles and parameters', () => {
    const logSpy = spyOn(console, 'log')
    logger.info(infoMessage)
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${infoBg}`, infoMessage)
  })

  test('logger.warn calls console.warn with styles and parameters', () => {
    const logSpy = spyOn(console, 'warn')
    logger.warn(warnMessage)
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${warnBg}`, warnMessage)
  })

  test('logger.error calls console.error with styles and parameters', () => {
    const logSpy = spyOn(console, 'error')
    logger.error(errorMessage)
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${errorBg}`, errorMessage)
  })

  test('logger.critical calls console.error with styles and parameters', () => {
    const logSpy = spyOn(console, 'error')
    logger.critical(criticalMessage)
    expect(logSpy).toHaveBeenCalledWith(
      `%c${loggerName}`,
      `${baseStyle} ${criticalBg}`,
      criticalMessage
    )
  })

  test('should call console.trace function when using logger.trace', () => {
    const logSpy = spyOn(console, 'trace')
    logger.trace('trace')
    expect(logSpy).toHaveBeenCalledWith(`%c${loggerName}`, `${baseStyle} ${logBg}`, 'trace')
  })

  test('should call console.table function when using logger.table', () => {
    const logSpy = spyOn(console, 'table')
    logger.table('table')
    expect(logSpy).toHaveBeenCalledWith('table')
  })
})
