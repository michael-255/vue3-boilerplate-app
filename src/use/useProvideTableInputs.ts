import { type Ref, ref, provide } from 'vue'
import { InjectionKey } from '@/constants/data-enums'
import type { Round } from '@/models/ExampleRecord'

/**
 * Used for dynamic inputs.
 * @see
 * Must add additional validation checks for new inputs as you create them.
 */
export function useProvideTableInputs(): { [x: string]: any } {
  // Field Models
  const idModel: Ref<any> = ref(null)
  const createdDateModel: Ref<any> = ref(null)
  const nameModel: Ref<any> = ref(null)
  const descriptionModel: Ref<any> = ref(null)
  const parentIdModel: Ref<any> = ref(null)
  const valueModel: Ref<any> = ref(null)
  // const roundsModel: Ref<Round[]> = ref([])
  // Field InputRefs
  const idInputRef: Ref<any> = ref(null)
  const createdDateInputRef: Ref<any> = ref(null)
  const nameInputRef: Ref<any> = ref(null)
  const descriptionInputRef: Ref<any> = ref(null)
  const parentIdInputRef: Ref<any> = ref(null)
  const valueInputRef: Ref<any> = ref(null)
  // No roundsInputRef by design

  /**
   * Update field model ref with a value.
   * @param value
   */
  function updateModel(modelRef: Ref<any>, value: any) {
    modelRef.value = value
  }

  /**
   * Checks input using the field input ref to see if its passing its validation.
   * @returns boolean
   */
  function isInputValid(inputRef: Ref<any>): boolean {
    return !!inputRef?.value?.validate()
  }

  function areExampleInputsValid(): boolean {
    return (
      isInputValid(idInputRef) &&
      isInputValid(createdDateInputRef) &&
      isInputValid(nameInputRef) &&
      isInputValid(descriptionInputRef)
    )
  }

  function areExampleRecordInputsValid(): boolean {
    return (
      isInputValid(idInputRef) &&
      isInputValid(createdDateInputRef) &&
      isInputValid(parentIdInputRef) &&
      isInputValid(valueInputRef)
    )
  }

  /**
   * Provide Statement - Provides all needed data table refs for injection
   */
  provide(InjectionKey.TABLE_INPUTS, {
    // Models
    idModel,
    createdDateModel,
    nameModel,
    descriptionModel,
    parentIdModel,
    valueModel,
    // roundsModel,
    // InputRefs
    idInputRef,
    createdDateInputRef,
    nameInputRef,
    descriptionInputRef,
    parentIdInputRef,
    valueInputRef,
    // Misc
    updateModel,
  })

  return {
    // Models
    idModel,
    createdDateModel,
    nameModel,
    descriptionModel,
    parentIdModel,
    valueModel,
    // roundsModel,
    // InputRefs
    idInputRef,
    createdDateInputRef,
    nameInputRef,
    descriptionInputRef,
    parentIdInputRef,
    valueInputRef,
    // Misc
    isInputValid,
    areExampleInputsValid,
    areExampleRecordInputsValid,
  }
}
