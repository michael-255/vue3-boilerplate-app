<script setup lang="ts">
import { QSelect } from 'quasar'
import { computed, onMounted, ref, type Ref } from 'vue'
import type { AppTable } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { isDefined } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'
import { getTableParentTable } from '@/helpers/table-parent-table'

const { log } = useLogger()
const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const parentIdInputRef: Ref<any> = ref(null)

/**
 * Uses the table prop to get access to getRelatedTable.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const options: Ref<any[]> = ref([])

/**
 * Sets the select box options with the parent items from the database.
 * @todo
 * NEEDED: async setup and Suspense component
 */
onMounted(async () => {
  const relatedTable = getTableParentTable(props.table)

  if (relatedTable) {
    const relatedTableData = await DB.getAll(relatedTable)

    // Sorts items that will become options
    const alphaSortedData = relatedTableData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })

    // Builds options with value and label
    options.value = alphaSortedData.map((a: any) => ({
      value: a.id,
      label: `${a.name} (${truncateString(a.id, 4, '*')})`, // Truncate id for readability
    }))

    // Set the current option
    if (selected.item?.parentId) {
      temporary.item.parentId = options.value?.find((o) => o.value === selected.item.parentId)
    } else if (options.value?.length) {
      temporary.item.parentId = options.value[0].value
    } else {
      temporary.item.parentId = null
    }

    /**
     * @todo async setup and Suspense component
     */
    // validateInput()
  } else {
    log.error('No related table to make parent selection', { name: 'ParentIdSelect:onMounted' })
  }
})

const parentId = computed({
  get() {
    return temporary.item.parentId
  },
  async set(value: any) {
    temporary.item.parentId = value
    validateInput()
  },
})

function validateInput(): void {
  validate.item.parentId = !!parentIdInputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="parentId"
    ref="parentIdInputRef"
    label="Parent"
    :options="options"
    :rules="[(val: string) => isDefined(val) || '* Required']"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
