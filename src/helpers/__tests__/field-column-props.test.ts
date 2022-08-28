import { describe, test, expect } from 'vitest'
import { getExactFieldColumnProps } from '@/helpers/field-column-props'
import { ExactField } from '@/constants/data-enums'

describe('field-column-props', () => {
  test('getExactFieldColumnProps return correct object for ID', () => {
    const fields = Object.values(ExactField) as ExactField[]

    fields.forEach((field) => {
      const obj = getExactFieldColumnProps(field)
      expect(obj).toHaveProperty('name')
      expect(obj).toHaveProperty('label')
      expect(obj).toHaveProperty('align')
      expect(obj).toHaveProperty('sortable')
      expect(obj).toHaveProperty('required')
      expect(obj).toHaveProperty('field')
      expect(obj).toHaveProperty('format')
    })
  })
})
