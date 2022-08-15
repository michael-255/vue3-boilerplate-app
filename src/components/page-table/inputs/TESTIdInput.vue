<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { v4 as createId } from 'uuid'
import { AppTable } from '@/constants/data-enums'
import { Icon } from '@/constants/ui-enums'
import { isId } from '@/utils/validators'
import { DB } from '@/services/LocalDatabase'

const props = defineProps<{ originalId: string }>()

const id: Ref<string> = ref('')
const previousId: Ref<string> = ref('')

onMounted(() => {
  id.value = props.originalId ? props.originalId : createId()
  previousId.value = props.originalId ? props.originalId : id.value
})

async function updateId() {
  await DB.updateById(AppTable.EXAMPLES, previousId.value, { id: id.value })
  previousId.value = id.value
}

async function generateId() {
  id.value = createId()
  await updateId()
}
</script>

<template>
  <QInput
    v-model="id"
    ref="idInputRef"
    label="Id"
    :rules="[(val: string) => isId(val) || 'Id must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="updateId()"
  >
    <template v-slot:after>
      <QBtn :icon="Icon.RENEW" color="primary" class="q-ml-xs q-px-sm" @click="generateId()" />
    </template>
  </QInput>
</template>
