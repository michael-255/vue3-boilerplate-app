<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useTableManager } from '@/use/useTableManager'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()

const { getFieldValidator } = useTableManager(props.table)
const { nameModel, nameInputRef, updateModel } = useInjectTableInputs()

/**
 * @todo
 */
onMounted(() => {
  if (!nameModel.value) {
    updateModel(nameModel, 'Example')
  }
})
</script>

<template>
  <QInput
    v-model="nameModel"
    ref="nameInputRef"
    label="Name"
    :rules="[getFieldValidator(TableField.NAME)]"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
