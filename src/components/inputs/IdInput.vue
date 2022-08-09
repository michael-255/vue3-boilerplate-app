<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useInputInject } from '@/use/useInputInject'
import { useTableManager } from '@/use/useTableManager'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()
const field = TableField.ID

const { getFieldValidator } = useTableManager(props.table)
const { idModel, idInputRef, idUpdateModel } = useInputInject(field)

/**
 * @todo
 */
onMounted(() => {
  if (!idModel.value) {
    idUpdateModel(createId())
  }
})
</script>

<template>
  <QInput
    v-model="idModel"
    ref="idInputRef"
    label="Id"
    :rules="[getFieldValidator(field)]"
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
        @click="idUpdateModel(createId())"
      />
    </template>
  </QInput>
</template>
