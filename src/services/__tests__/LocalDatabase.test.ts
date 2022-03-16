import { describe, test, expect } from 'vitest'
import { LocalDatabase } from '../LocalDatabase'

/**
 * Only confirms wrapper methods exist on new LocalDatabase instance.
 * @todo Need a Dexie mocking solution to improve these tests.
 */
describe('LocalDatabase', () => {
  const db = new LocalDatabase()

  test('should have addUser method', () => {
    expect(db.addUser instanceof Function).toBe(true)
  })

  test('should have addExample method', () => {
    expect(db.addExample instanceof Function).toBe(true)
  })

  test('should have getAllUsers method', () => {
    expect(db.getAllUsers instanceof Function).toBe(true)
  })

  test('should have getAllExamples method', () => {
    expect(db.getAllExamples instanceof Function).toBe(true)
  })

  test('should have getUserByName method', () => {
    expect(db.getUserByName instanceof Function).toBe(true)
  })

  test('should have getNewestExample method', () => {
    expect(db.getNewestExample instanceof Function).toBe(true)
  })

  test('should have getOldestExample method', () => {
    expect(db.getOldestExample instanceof Function).toBe(true)
  })
})
