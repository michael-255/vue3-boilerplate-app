<script setup lang="ts">
import { DexieTable, TableField } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useTableManager } from '@/use/useTableManager'
import { useInputProvide } from '@/use/useInputProvide'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

/**
 * Component for handling table item Creates
 */

const props = defineProps<{ table: DexieTable }>()
const emits = defineEmits<{ (eventName: 'on-create'): void }>()

const { confirmDialog } = useSimpleDialogs()
const { TM, getFieldComponent } = useTableManager(props.table)

const { idModel, idValidate } = useInputProvide(TableField.ID)
const { createdDateModel, createdDateValidate } = useInputProvide(TableField.CREATED_DATE)
const { nameModel, nameValidate } = useInputProvide(TableField.NAME)
const { descriptionModel, descriptionValidate } = useInputProvide(TableField.DESCRIPTION)
const { parentIdModel, parentIdValidate } = useInputProvide(TableField.PARENT_ID)
const { valueModel, valueValidate } = useInputProvide(TableField.VALUE)

function onCreate() {
  confirmDialog(
    'Create',
    `Are you sure you want to create this ${TM.labelSingular}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    () => {
      // @todo create logic from TM
      emits('on-create')
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
    :label="`Create ${TM.labelSingular}`"
    @click="onCreate()"
  />
</template>
