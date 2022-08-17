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
const valueInputRef: Ref<any> = ref(null)

onMounted(() => {
  temporary.item.value = selected.item?.value ? selected.item.value : 1
})

function validateInput(): void {
  validate.value = !!valueInputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="temporary.item.value"
    ref="valueInputRef"
    label="Value"
    :rules="[(val: number) => isPositiveNumber(val) || 'Positive number not exceeding 1,000,000,000 is required']"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
