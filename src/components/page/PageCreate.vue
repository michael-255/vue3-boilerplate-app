<script setup lang="ts">
import { DexieTable, Field } from '@/constants/data-enums'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useProvideTableInputs } from '@/use/useProvideTableInputs'
import { useLogger } from '@/use/useLogger'
import { useTable } from '@/use/useTable'
import { useFields } from '@/use/useFields'

/**
 * Component for handling table item Creates
 */

const props = defineProps<{ table: DexieTable }>()
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

function onCreate() {
  try {
    const areInputsValid = {
      [DexieTable.EXAMPLES]: areExampleInputsValid(),
      [DexieTable.EXAMPLE_RECORDS]: areExampleRecordInputsValid(),
      [DexieTable.LOGS]: false,
      [DexieTable.SETTINGS]: false,
    }[props.table]

    if (!areInputsValid) {
      createDismissDialog()
    } else {
      createConfirmDialog()
    }
  } catch (error) {
    log.error('onCreate', error)
  }
}

function createDismissDialog(): void {
  dismissDialog(
    'Validation Failed',
    'One or more inputs have invalid entries.',
    Icon.WARN,
    NotifyColor.WARN
  )
}

function createConfirmDialog(): void {
  confirmDialog(
    'Create',
    `Are you sure you want to create this ${getSingularLabel(props.table)}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    async () => {
      await getActions(props.table).createRow({
        id: idModel.value,
        createdDate: createdDateModel.value,
        name: nameModel.value,
        description: descriptionModel.value,
        parentId: parentIdModel.value,
        value: valueModel.value,
      })
      emits('on-create')
    }
  )
}
</script>

<template>
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
