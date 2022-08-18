<script setup lang="ts">
import { QInput } from 'quasar'
import { isPositiveNumber } from '@/utils/validators'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'
import { onMounted, ref, type Ref } from 'vue'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const numberInputRef: Ref<any> = ref(null)

// Setup
temporary.item.number = selected.item?.value ? selected.item.number : 1

onMounted(() => {
  validateInput()
})

function validateInput(): void {
  validate.item.number = !!numberInputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="temporary.item.number"
    ref="numberInputRef"
    label="Number"
    :rules="[(val: number) => isPositiveNumber(val) || 'Positive number not exceeding 1,000,000,000 is required']"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
