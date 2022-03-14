import { describe, test, expect } from 'vitest'
import { User } from '../User'

describe('User', () => {
  const userId = 'TEST-1234'
  const userName = 'Test User'
  const userDate = new Date('2022/1/1').toISOString()
  const userAttrs = { test: 123 }

  const user = new User({
    id: userId,
    createdDate: userDate,
    name: userName,
    attributes: userAttrs,
  })

  test('should return an id when calling getId', () => {
    expect(user.getId()).toBe(userId)
  })

  test('should return a user name greeting when calling greeting', () => {
    expect(user.greeting()).toBe(`Hello ${userName}!`)
  })

  test('should return an ISO string date when calling getDate', () => {
    expect(user.getDate()).toMatch(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})/)
  })

  test('should return the user attributes object when calling getAttributes', () => {
    expect(user.getAttributes()).toMatchObject(userAttrs)
  })
})
