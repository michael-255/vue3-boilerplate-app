<script setup lang="ts">
import { AppTable, Field } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { getFieldComponent } from '@/helpers/field-components'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import { useTemporaryItemStore } from '@/stores/temporary-item'
import { useSelectedItemStore } from '@/stores/selected-item'
import { useValidateItemStore } from '@/stores/validate-item'
import { getTableFields } from '@/helpers/table-fields'
import { getTableActions } from '@/helpers/table-actions'
import { getTableLabel } from '@/helpers/table-label'

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

/**
 * Determines how the update operation will proceed based on validate results.
 */
function onUpdate() {
  try {
    if (!validate.tableItem(props.table)) {
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
    `Are you sure you want to update this ${getTableLabel(props.table, 'singular')}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { updateRow } = getTableActions(props.table)
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
  <div v-for="(field, i) in getTableFields(table)" :key="i">
    <component v-if="field === Field.PARENT_ID" :is="getFieldComponent(field)" :table="table" />
    <component v-else :is="getFieldComponent(field)" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Update ${getTableLabel(table, 'singular')}`"
    @click="onUpdate()"
  />
</template>
