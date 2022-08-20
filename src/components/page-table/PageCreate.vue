<script setup lang="ts">
import { AppTable, Field } from '@/constants/data-enums'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { getFieldComponent } from '@/helpers/field-components'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useLogger } from '@/use/useLogger'
import useTemporaryItemStore from '@/stores/temporary-item'
import useValidateItemStore from '@/stores/validate-item'
import { getTableFields } from '@/helpers/table-fields'
import { getTableActions } from '@/helpers/table-actions'
import { getTableLabel } from '@/helpers/table-label'

const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()

/**
 * Component for handling table item Creates using Provide/Inject for the inputs.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const emits = defineEmits<{ (eventName: 'on-create'): void }>()

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()

/**
 * Determines how the create operation will proceed based on validate results.
 */
function onCreate() {
  try {
    if (!validate.tableItem(props.table)) {
      createDismissDialog()
    } else {
      createConfirmDialog()
    }
  } catch (error) {
    log.error('PageCreate:onCreate', error)
  }
}

/**
 * Dismiss dialog due to validate failure.
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
    `Are you sure you want to create this ${getTableLabel(props.table, 'singular')}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      const { createRow } = getTableActions(props.table)
      if (createRow) {
        await createRow(temporary.item)
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
  <div v-for="(field, i) in getTableFields(table)" :key="i">
    <component v-if="field === Field.PARENT_ID" :is="getFieldComponent(field)" :table="table" />
    <component v-else :is="getFieldComponent(field)" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Create ${getTableLabel(props.table, 'singular')}`"
    @click="onCreate()"
  />
</template>
