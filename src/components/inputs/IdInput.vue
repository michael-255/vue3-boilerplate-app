<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useTableManager } from '@/use/useTableManager'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()

const { getFieldValidator } = useTableManager(props.table)
const { idModel, idInputRef, updateModel } = useInjectTableInputs()

/**
 * @todo
 */
onMounted(() => {
  if (!idModel.value) {
    updateModel(idModel, createId())
  }
})
</script>

<template>
  <QInput
    v-model="idModel"
    ref="idInputRef"
    label="Id"
    :rules="[getFieldValidator(TableField.ID)]"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  >
    <template v-slot:after>
      <QBtn
        :icon="Icon.RENEW"
        color="primary"
        class="q-ml-xs q-px-sm"
        @click="updateModel(idModel, createId())"
      />
    </template>
  </QInput>
</template>
