<script setup lang="ts">
import { DexieTable, Field } from '@/constants/data-enums.js'
import type { DataObject } from '@/constants/types-interfaces'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { onMounted } from 'vue'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useProvideTableInputs } from '@/use/useProvideTableInputs'
import { useLogger } from '@/use/useLogger'
import { useTable } from '@/use/useTable'
import { useFields } from '@/use/useFields'

/**
 * Component for handling table item Updates using Provide/Inject for the inputs.
 * @param table
 * @param item Row selected in the table
 */
const props = defineProps<{
  table: DexieTable
  item: DataObject | undefined
}>()
const emits = defineEmits<{ (eventName: 'on-update'): void }>()

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
 * Sets the inputs models with the current values from the selected row in the table.
 */
onMounted(async () => {
  if (props.item) {
    const { id, createdDate, name, description, parentId, value } = props.item
    idModel.value = id
    createdDateModel.value = createdDate
    nameModel.value = name
    descriptionModel.value = description
    parentIdModel.value = parentId
    valueModel.value = value
  } else {
    log.error('Item is undefined', { name: 'PageUpdate:onMounted' })
  }
})

/**
 * Determines how the update operation will proceed based on validation results.
 */
function onUpdate() {
  try {
    /**
     * @see
     * MUST DEFINE TABLES BELOW
     */
    const areInputsValid = {
      [DexieTable.EXAMPLES]: areExampleInputsValid(),
      [DexieTable.EXAMPLE_RECORDS]: areExampleRecordInputsValid(),
      [DexieTable.LOGS]: false,
      [DexieTable.SETTINGS]: false,
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
 * Dismiss dialog due to validation failure.
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
        await updateRow({
          originalId: props.item?.id,
          id: idModel.value,
          createdDate: createdDateModel.value,
          name: nameModel.value,
          description: descriptionModel.value,
          parentId: parentIdModel.value,
          value: valueModel.value,
        })
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
