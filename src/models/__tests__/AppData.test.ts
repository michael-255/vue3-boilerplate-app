import { describe, test, expect } from 'vitest'
import { AppData } from '../AppData'

describe('AppData', () => {
  const testExamples: any[] = [{ test: 1 }]
  const testExampleRecords: any[] = [{ test: 2 }]
  const testLogs: any[] = [{ test: 3 }]
  const testSettings: any[] = [{ test: 4 }]

  const testParams = {
    examples: testExamples,
    exampleRecords: testExampleRecords,
    logs: testLogs,
    settings: testSettings,
  }

  test('AppData should have correct properties', () => {
    const model = new AppData(testParams)
    const keys = Object.keys(model)
    expect(keys.length).toBe(4)
    expect(model.examples).toBe(testExamples)
    expect(model.exampleRecords).toBe(testExampleRecords)
    expect(model.logs).toBe(testLogs)
    expect(model.settings).toBe(testSettings)
  })

  test('create AppData with params', () => {
    const model = new AppData(testParams)
    expect(model.examples).toEqual(testExamples)
    expect(model.exampleRecords).toEqual(testExampleRecords)
    expect(model.logs).toEqual(testLogs)
    expect(model.settings).toEqual(testSettings)
  })
})
