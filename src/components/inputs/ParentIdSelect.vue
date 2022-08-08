<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { DexieTable, TableField } from '@/constants/data-enums'
import { isRequired } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { useTableManager } from '@/use/useTableManager'

/**
 * @todo
 */

const props = defineProps<{ table: DexieTable }>()

const { TM } = useTableManager(props.table)
const { parentIdModel, parentIdInputRef } = useInputInject(TableField.PARENT_ID)
const options: Ref<any[]> = ref([])

/**
 * @todo
 */
onMounted(async () => {
  const relatedTableData = await DB.getAll(TM.relatedTable)

  const alphaSortedData = relatedTableData.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name)
  })

  options.value = alphaSortedData.map((a: any) => ({
    value: a.id,
    label: `${a.name} (${truncateString(a.id, 4, '*')})`,
  }))
})
</script>

<template>
  <QSelect
    ref="parentIdInputRef"
    v-model="parentIdModel"
    label="Parent"
    :options="options"
    :rules="[(val: string) => isRequired(val) || '* Required',]"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
