<script setup lang="ts">
import { AppTable, Field } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { getFieldComponent } from '@/helpers/field-components'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { useTable } from '@/use/useTable'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()

/**
 * Component for handling table item Updates using Provide/Inject for the inputs.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-update'): void }>()

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const { getFields, getActions, getSingularLabel } = useTable()

/**
 * Determines how the update operation will proceed based on validate results.
 */
function onUpdate() {
  try {
    /**
     * @see
     * MUST DEFINE TABLES BELOW
     */
    const areInputsValid = {
      [AppTable.EXAMPLES]: validate.isExampleValid,
      [AppTable.EXAMPLE_RECORDS]: validate.isExampleRecordValid,
      [AppTable.LOGS]: false,
    }[props.table]

    if (!areInputsValid) {
      updateDismissDialog()
    } else {
      updateConfirmDialog()
    }
  } catch (error) {
    log.error('PageUpdate:onUpdate', error)
  }
}

/**
 * Dismiss dialog due to validate failure.
 */
function updateDismissDialog(): void {
  dismissDialog(
    'Validation Failed',
    'Unable to update item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

/**
 * Confirm that you want to update the item with the current values entered into the input models.
 */
function updateConfirmDialog(): void {
  confirmDialog(
    'Update',
    `Are you sure you want to update this ${getSingularLabel(props.table)}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { updateRow } = getActions(props.table)
      if (updateRow) {
        /**
         * @see
         * MUST ADD NEW INPUT MODELS HERE (Provide/Inject)
         */
        await updateRow({ originalId: selected.item.id, ...temporary.item })
        emits('on-update')
      } else {
        log.error('Missing updateRow action', { name: 'PageUpdate:updateConfirmDialog' })
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
    :label="`Update ${getSingularLabel(table)}`"
    @click="onUpdate()"
  />
</template>
