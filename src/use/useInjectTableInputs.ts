import { inject } from 'vue'
import { InjectionKey } from '@/constants/data-enums'

/**
 * Used for dynamic inputs.
 */
export function useInjectTableInputs(): { [x: string]: any } {
  // Inject Statement - Injects all needed refs for data tables into component
  const {
    // Models
    idModel,
    createdDateModel,
    nameModel,
    descriptionModel,
    parentIdModel,
    valueModel,
    roundsModel,
    // InputRefs
    idInputRef,
    createdDateInputRef,
    nameInputRef,
    descriptionInputRef,
    parentIdInputRef,
    valueInputRef,
    // Misc
    updateModel,
  } = inject(InjectionKey.TABLE_INPUTS) as any

  return {
    // Models
    idModel,
    createdDateModel,
    nameModel,
    descriptionModel,
    parentIdModel,
    valueModel,
    roundsModel,
    // InputRefs
    idInputRef,
    createdDateInputRef,
    nameInputRef,
    descriptionInputRef,
    parentIdInputRef,
    valueInputRef,
    // Misc
    updateModel,
  }
}
