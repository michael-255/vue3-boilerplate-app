<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { DexieTable, Field } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'
import { useTable } from '@/use/useTable'
import { useFields } from '@/use/useFields'

/**
 * @todo
 */

const props = defineProps<{ table: DexieTable }>()

const { getFieldValidator } = useFields()
const { getRelatedTable } = useTable()
const { parentIdModel, parentIdInputRef } = useInjectTableInputs()
const options: Ref<any[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  const relatedTable = getRelatedTable(props.table)

  if (relatedTable) {
    const relatedTableData = await DB.getAll(relatedTable)

    const alphaSortedData = relatedTableData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })

    options.value = alphaSortedData.map((a: any) => ({
      value: a.id,
      label: `${a.name} (${truncateString(a.id, 4, '*')})`,
    }))
  }
})
</script>

<template>
  <QSelect
    ref="parentIdInputRef"
    v-model="parentIdModel"
    label="Parent"
    :options="options"
    :rules="[getFieldValidator(Field.PARENT_ID)]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
