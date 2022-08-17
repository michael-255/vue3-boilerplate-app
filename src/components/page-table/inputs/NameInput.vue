<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { isShortText } from '@/utils/validators'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const nameInputRef: Ref<any> = ref(null)

/**
 * Sets the model ref with a default if no value is provided.
 */
onMounted(() => {
  temporary.item.name = selected.item?.name ? selected.item.name : 'Example Name'
})

function validateInput(): void {
  validate.name = !!nameInputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="temporary.item.name"
    ref="nameInputRef"
    label="Name"
    :rules="[(val: string) => isShortText(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
