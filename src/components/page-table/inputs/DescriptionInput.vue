<script setup lang="ts">
import { QInput } from 'quasar'
import { isOptionalLongText } from '@/utils/validators'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'
import { onMounted, ref, type Ref } from 'vue'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const descriptionInputRef: Ref<any> = ref(null)
const maxLength = 500

// Setup
temporary.item.description = selected.item?.description ? selected.item.description : ''

onMounted(() => {
  validateInput()
})

function validateInput(): void {
  validate.item.description = !!descriptionInputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="temporary.item.description"
    ref="descriptionInputRef"
    label="Description"
    :rules="[(val: string) => isOptionalLongText(val) || 'Description is limited to 500 characters']"
    :maxlength="maxLength"
    :hint="`${temporary.item.description?.length || '0'}/${maxLength}`"
    dense
    outlined
    autogrow
    type="textarea"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
