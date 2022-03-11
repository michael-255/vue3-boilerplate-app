import { describe, test, expect, spyOn, beforeEach, vi } from 'vitest'
import { Logger } from '../classes/Logger'

describe('Logger', () => {
  let logger: Logger

  beforeEach(() => {
    vi.clearAllMocks()
    logger = new Logger()
  })

  test('should call console.log function', () => {
    const logSpy = spyOn(console, 'log')
    logger.log('log')
    expect(logSpy).toHaveBeenCalledWith(
      '%cLogger',
      'border-radius: 3px; padding: 2px 4px; color: white; background-color: #2196F3;',
      'log'
    )
  })

  test('should call console.warn function', () => {
    const logSpy = spyOn(console, 'warn')
    logger.warn('warn')
    expect(logSpy).toHaveBeenCalledWith(
      '%cLogger',
      'border-radius: 3px; padding: 2px 4px; color: white; background-color: #FF9800;',
      'warn'
    )
  })

  test('should call console.error function', () => {
    const logSpy = spyOn(console, 'error')
    logger.error('error')
    expect(logSpy).toHaveBeenCalledWith(
      '%cLogger',
      'border-radius: 3px; padding: 2px 4px; color: white; background-color: #F44336;',
      'error'
    )
  })

  test('should call console.trace function', () => {
    const logSpy = spyOn(console, 'trace')
    logger.trace('trace')
    expect(logSpy).toHaveBeenCalledWith(
      '%cLogger',
      'border-radius: 3px; padding: 2px 4px; color: white; background-color: #2196F3;',
      'trace'
    )
  })

  test('should call console.table function', () => {
    const logSpy = spyOn(console, 'table')
    logger.table('table')
    expect(logSpy).toHaveBeenCalledWith('table')
  })
})
