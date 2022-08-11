<script setup lang="ts">
import { DexieTable } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { onMounted } from 'vue'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useProvideTableInputs } from '@/use/useProvideTableInputs'
import { useTableManager } from '@/use/useTableManager'
import { useLogger } from '@/use/useLogger'

/**
 * Component for handling table item Updates
 */

const props = defineProps<{
  table: DexieTable
  selectedItem: { [x: string]: any }
}>()
const emits = defineEmits<{ (eventName: 'on-update'): void }>()

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()
const { TM, getFieldComponent } = useTableManager(props.table)
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

onMounted(async () => {
  const { id, createdDate, name, description, parentId, value } = props.selectedItem
  idModel.value = id
  createdDateModel.value = createdDate
  nameModel.value = name
  descriptionModel.value = description
  parentIdModel.value = parentId
  valueModel.value = value
})

function onUpdate() {
  try {
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
    log.error('onUpdate', error)
  }
}

function updateDismissDialog(): void {
  dismissDialog(
    'Validation Failed',
    'One or more inputs have invalid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

function updateConfirmDialog(): void {
  confirmDialog(
    'Update',
    `Are you sure you want to update this ${TM.labelSingular}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      await TM.actions.update({
        originalId: props.selectedItem.id,
        id: idModel.value,
        createdDate: createdDateModel.value,
        name: nameModel.value,
        description: descriptionModel.value,
        parentId: parentIdModel.value,
        value: valueModel.value,
      })
      emits('on-update')
    }
  )
}
</script>

<template>
  <div v-for="(field, i) in TM.fields" :key="i">
    <component :is="getFieldComponent(field)" :table="table" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Update ${TM.labelSingular}`"
    @click="onUpdate()"
  />
</template>
