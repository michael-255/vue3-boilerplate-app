<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'
import { isShortText } from '@/utils/validators'

const { nameModel, nameInputRef, updateModel } = useInjectTableInputs()

/**
 * Sets the model ref with a default if no value is provided.
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
    :rules="[(val: string) => isShortText(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
