import { describe, test, expect } from 'vitest'
import { useFields } from '@/use/useFields'
import { Field } from '@/constants/data-enums'

/**
 * Some fields are ignored because they are internal.
 * @param field
 * @returns Boolean if it is an ignored field
 */
function isIgnoredField(field: Field): boolean {
  return (
    field === Field.SEVERITY ||
    field === Field.DETAILS ||
    field === Field.MESSAGE ||
    field === Field.STACK
  )
}

describe('useFields', () => {
  const { getFieldValidator, getFieldComponent } = useFields()

  test('getFieldComponent return an AsyncComponentWrapper object for each field', () => {
    const asyncNameObj = { name: 'AsyncComponentWrapper' }
    const fields = Object.values(Field) as Field[]
    fields.forEach((field) => {
      if (!isIgnoredField(field)) {
        expect(getFieldComponent(field)).toEqual(expect.objectContaining(asyncNameObj))
      }
    })
  })

  test('getFieldValidator returns a validator for each checked field', () => {
    const fields = Object.values(Field) as Field[]
    fields.forEach((field) => {
      if (!isIgnoredField(field)) {
        expect(typeof getFieldValidator(field)).toBe('function')
      }
    })
  })

  test('getFieldValidator returns usable validator for ID', () => {
    const func = getFieldValidator(Field.ID)
    expect(func('test')).toBe(true)
    expect(func(null)).toBe('Id must be between 1 and 40 characters')
  })

  test('getFieldValidator returns usable validator for CREATED_DATE', () => {
    const func = getFieldValidator(Field.CREATED_DATE)
    expect(func(new Date().toISOString())).toBe(true)
    expect(func(null)).toBe('Date must be of format YYYY-MM-DDTHH:MM:SS.###Z')
  })

  test('getFieldValidator returns usable validator for NAME', () => {
    const func = getFieldValidator(Field.NAME)
    expect(func('test')).toBe(true)
    expect(func(null)).toBe('Name must be between 1 and 40 characters')
  })

  test('getFieldValidator returns usable validator for DESCRIPTION', () => {
    const func = getFieldValidator(Field.DESCRIPTION)
    expect(func('test')).toBe(true)
    expect(func(Array(500).fill('X').toString())).toBe('Description is limited to 500 characters')
  })

  test('getFieldValidator returns usable validator for PARENT_ID', () => {
    const func = getFieldValidator(Field.PARENT_ID)
    expect(func('test')).toBe(true)
    expect(func(null)).toBe('* Required')
  })

  test('getFieldValidator returns usable validator for VALUE', () => {
    const func = getFieldValidator(Field.VALUE)
    expect(func(123)).toBe(true)
    expect(func(null)).toBe('Positive number not exceeding 999,999,999 is required')
  })
})
