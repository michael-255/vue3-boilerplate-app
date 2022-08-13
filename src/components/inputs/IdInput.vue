<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { Field } from '@/constants/data-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

/**
 * @todo
 */

const { getFieldValidator } = useFields()
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
    :rules="[getFieldValidator(Field.ID)]"
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
