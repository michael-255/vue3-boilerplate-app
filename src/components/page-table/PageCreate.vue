<script setup lang="ts">
import { AppTable, InputField } from '@/constants/data-enums'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { getInputFieldComponent } from '@/helpers/field-components'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import useTemporaryItemStore from '@/stores/temporary-item'
import useValidateItemStore from '@/stores/validate-item'
import { getTableInputFields } from '@/helpers/table-fields'
import { getTableActions } from '@/helpers/table-actions'
import { getTableLabel } from '@/helpers/table-label'

/**
 * Component for displaying inputs for the creation of new data items.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-create-confired'): void }>()
const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()
const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()

function onCreate() {
  try {
    if (!validate.tableItem(props.table)) {
      validationFailedDialog()
    } else {
      confirmCreateDialog()
    }
  } catch (error) {
    log.error('PageCreate:onCreate', error)
  }
}

function validationFailedDialog(): void {
  dismissDialog(
    'Validation Error',
    'Unable to create item. Ensure all of the inputs have valid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

function confirmCreateDialog(): void {
  confirmDialog(
    'Create',
    `Are you sure you want to create this ${getTableLabel(props.table, 'singular')}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { createRow } = getTableActions(props.table)
      if (createRow) {
        await createRow(temporary.item)
        emits('on-create-confired')
      } else {
        log.error('Missing createRow action', { name: 'PageCreate:createConfirmDialog' })
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
    :label="`Create ${getTableLabel(props.table, 'singular')}`"
    @click="onCreate()"
  />
</template>
