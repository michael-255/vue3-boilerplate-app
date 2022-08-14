<script setup lang="ts">
import { AppTable, Field } from '@/constants/data-enums'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useProvideTableInputs } from '@/use/useProvideTableInputs'
import { useLogger } from '@/use/useLogger'
import { useTable } from '@/use/useTable'
import { useFields } from '@/use/useFields'

/**
 * Component for handling table item Creates using Provide/Inject for the inputs.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-create'): void }>()

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const { getFieldComponent } = useFields()
const { getFields, getActions, getSingularLabel } = useTable()
const {
  // Models
  idModel,
  createdDateModel,
  nameModel,
  descriptionModel,
  parentIdModel,
  valueModel,
  areExampleInputsValid,
  areExampleRecordInputsValid,
} = useProvideTableInputs()

/**
 * Determines how the create operation will proceed based on validation results.
 */
function onCreate() {
  try {
    /**
     * @see
     * MUST DEFINE TABLES BELOW
     */
    const areInputsValid = {
      [AppTable.EXAMPLES]: areExampleInputsValid(),
      [AppTable.EXAMPLE_RECORDS]: areExampleRecordInputsValid(),
      [AppTable.LOGS]: false,
    }[props.table]

    if (!areInputsValid) {
      createDismissDialog()
    } else {
      createConfirmDialog()
    }
  } catch (error) {
    log.error('PageCreate:onCreate', error)
  }
}

/**
 * Dismiss dialog due to validation failure.
 */
function createDismissDialog(): void {
  dismissDialog(
    'Validation Failed',
    'Unable to create item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

/**
 * Confirm that you want to create the item with the current values entered into the input models.
 */
function createConfirmDialog(): void {
  confirmDialog(
    'Create',
    `Are you sure you want to create this ${getSingularLabel(props.table)}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { createRow } = getActions(props.table)
      if (createRow) {
        /**
         * @see
         * MUST ADD NEW INPUT MODELS HERE (Provide/Inject)
         */
        await createRow({
          id: idModel.value,
          createdDate: createdDateModel.value,
          name: nameModel.value,
          description: descriptionModel.value,
          parentId: parentIdModel.value,
          value: valueModel.value,
        })
        emits('on-create')
      } else {
        log.error('Missing createRow action', { name: 'PageCreate:createConfirmDialog' })
      }
    }
  )
}
</script>

<template>
  <!-- Dynamically load components for each input -->
  <div v-for="(field, i) in getFields(table)" :key="i">
    <component v-if="field === Field.PARENT_ID" :is="getFieldComponent(field)" :table="table" />
    <component v-else :is="getFieldComponent(field)" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Create ${getSingularLabel(props.table)}`"
    @click="onCreate()"
  />
</template>
