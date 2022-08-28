import { describe, test, expect } from 'vitest'
import { getInputFieldComponent } from '@/helpers/field-components'
import { InputField } from '@/constants/data-enums'

describe('field-components', () => {
  test('getFieldComponent return an AsyncComponentWrapper object for each field', () => {
    const fields = Object.values(InputField) as InputField[]

    fields.forEach((field) => {
      const obj = getInputFieldComponent(field)
      expect(obj).toHaveProperty('name')
      expect(obj.name).toBe('AsyncComponentWrapper')
    })
  })
})
