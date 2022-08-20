<script setup lang="ts">
import { QInput } from 'quasar'
import { isPositiveNumber } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import { ref, type Ref } from 'vue'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
temporary.item.number = selected.item?.number ? selected.item.number : 1
validate.item.number = true

function validateInput(): void {
  validate.item.number = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="temporary.item.number"
    ref="inputRef"
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
