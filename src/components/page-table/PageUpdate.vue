<script setup lang="ts">
import { AppTable, InputField } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { getInputFieldComponent } from '@/helpers/field-components'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import { getTableInputFields } from '@/helpers/table-fields'
import { getTableActions } from '@/helpers/table-actions'
import { getTableLabel } from '@/helpers/table-label'

/**
 * Component for displaying inputs for the updating an existing data item.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-update-confired'): void }>()
const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()

function onUpdate() {
  try {
    if (!validate.tableItem(props.table)) {
      validationFailedDialog()
    } else {
      confirmUpdateDialog()
    }
  } catch (error) {
    log.error('PageUpdate:onUpdate', error)
  }
}

function validationFailedDialog(): void {
  dismissDialog(
    'Validation Error',
    'Unable to update item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

function confirmUpdateDialog(): void {
  confirmDialog(
    'Update',
    `Are you sure you want to update this ${getTableLabel(props.table, 'singular')}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { updateRow } = getTableActions(props.table)
      if (updateRow) {
        await updateRow({
          originalId: selected.item.id,
          ...JSON.parse(JSON.stringify(temporary.item)),
        })
        emits('on-update-confired')
      } else {
        log.error('Missing updateRow action', { name: 'PageUpdate:confirmUpdateDialog' })
      }
    }
  )
}
</script>

<template>
  <!-- Dynamically load components for each input with any needed custom props -->
  <div v-for="(field, i) in getTableInputFields(table)" :key="i">
    <component
      v-if="field === InputField.PARENT_ID"
      :is="getInputFieldComponent(field)"
      :table="table"
    />
    <component v-else :is="getInputFieldComponent(field)" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Update ${getTableLabel(table, 'singular')}`"
    @click="onUpdate()"
  />
</template>
