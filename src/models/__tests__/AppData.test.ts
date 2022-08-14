import { describe, test, expect } from 'vitest'
import { AppData } from '../AppData'

describe('AppData', () => {
  const testExamples: any[] = [{ test: 2 }]
  const testExampleRecords: any[] = [{ test: 3 }]
  const testLogs: any[] = [{ test: 1 }]

  test('AppData should have correct number of properties', () => {
    const appData = new AppData()
    expect(Object.keys(appData).length).toBe(3)
  })

  test('create AppData with all params', () => {
    const appData = new AppData({
      examples: testExamples,
      exampleRecords: testExampleRecords,
      logs: testLogs,
    })

    expect(appData.examples).toBe(testExamples)
    expect(appData.exampleRecords).toBe(testExampleRecords)
    expect(appData.logs).toBe(testLogs)
  })

  test('create AppData with no params', () => {
    const appData = new AppData()
    expect(appData.examples).toEqual([])
    expect(appData.exampleRecords).toEqual([])
    expect(appData.logs).toEqual([])
  })
})
