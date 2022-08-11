<script setup lang="ts">
import type { DexieTable } from '@/constants/data-enums.js'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useTableManager } from '@/use/useTableManager'
// import { useInputProvide } from '@/use/useInputProvide'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

/**
 * Component for handling table item Updates
 */

const props = defineProps<{
  table: DexieTable
  selectedItem: { [x: string]: any }
}>()

const emits = defineEmits<{
  (eventName: 'on-update'): void
}>()

const { confirmDialog } = useSimpleDialogs()
const { TM, getFieldComponent } = useTableManager(props.table)

// const { idModel, idValidate } = useInputProvide(TableField.ID)
// const { createdDateModel, createdDateValidate } = useInputProvide(TableField.CREATED_DATE)
// const { nameModel, nameValidate } = useInputProvide(TableField.NAME)
// const { descriptionModel, descriptionValidate } = useInputProvide(TableField.DESCRIPTION)

function onUpdate() {
  confirmDialog(
    'Update',
    `Are you sure you want to update this ${TM.labelSingular}?`,
    Icon.SAVE,
    NotifyColor.INFO,
    () => {
      // @todo update logic from TM
      emits('on-update')
    }
  )
}
</script>

<template>
  <div v-for="(field, i) in TM.fields" :key="i">
    <component :is="getFieldComponent(field)" />
  </div>

  <QBtn
    class="q-mt-lg"
    color="primary"
    :icon="Icon.SAVE"
    :label="`Create ${TM.labelSingular}`"
    @click="onUpdate()"
  />
</template>
