import { describe, test, expect } from 'vitest'
import { AppData } from '../AppData'

describe('AppData', () => {
  const testExamples: any[] = [{ test: 1 }]
  const testExampleRecords: any[] = [{ test: 2 }]
  const testLogs: any[] = [{ test: 3 }]
  const testSettings: any[] = [{ test: 4 }]

  test('create AppData with all params', () => {
    const appData = new AppData({
      examples: testExamples,
      exampleRecords: testExampleRecords,
      logs: testLogs,
      settings: testSettings,
    })

    expect(Object.keys(appData).length).toBe(4)
    expect(appData.examples).toBe(testExamples)
    expect(appData.exampleRecords).toBe(testExampleRecords)
    expect(appData.logs).toBe(testLogs)
    expect(appData.settings).toBe(testSettings)
  })

  test('create AppData with no params', () => {
    const appData = new AppData()

    expect(Object.keys(appData).length).toBe(4)
    expect(appData.examples).toEqual([])
    expect(appData.exampleRecords).toEqual([])
    expect(appData.logs).toEqual([])
    expect(appData.settings).toEqual([])
  })
})
