<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { Field } from '@/constants/data-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

const { getFieldValidator } = useFields()
const { idModel, idInputRef, updateModel } = useInjectTableInputs()

/**
 * Sets the model ref with a random id if one was not provided.
 */
onMounted(() => {
  if (!idModel.value) {
    updateModel(idModel, createId())
  }
})

/**
 * Resets the model ref with a random id.
 */
function randomId(): void {
  updateModel(idModel, createId())
}
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
      <QBtn :icon="Icon.RENEW" color="primary" class="q-ml-xs q-px-sm" @click="randomId()" />
    </template>
  </QInput>
</template>
