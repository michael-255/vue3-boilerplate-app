<script setup lang="ts">
import { QSelect } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import type { AppTable } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { truncateString } from '@/utils/common'
import { isDefined } from '@/utils/validators'
import { useLogger } from '@/use/useLogger'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import { getTableParentTable } from '@/helpers/table-parent-table'

/**
 * Uses the table prop to get access to getRelatedTable.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const { log } = useLogger()
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

/**
 * Sets the select box options with the parent items from the database.
 */
onMounted(async () => {
  const parentTable = getTableParentTable(props.table)

  if (parentTable) {
    const parentTableData = await DB.getAll(parentTable)

    // Sorts items that will become options
    const alphaSortedData = parentTableData.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name)
    })

    // Builds options with value and label
    options.value = alphaSortedData.map((a: any) => ({
      value: a.id,
      label: `${a.name} (${truncateString(a.id, 4, '*')})`, // Truncate id for readability
    }))

    // Set the current option
    // must do this first so it can be null if parent was deleted versus being the first option
    if (selected.item?.parentId) {
      const parent = options.value?.find((opt) => opt.value === selected.item.parentId)?.value
      if (parent) {
        temporary.item.parentId = parent
        validate.item.parentId = true
      } else {
        temporary.item.parentId = null
        validate.item.parentId = false
      }
    } else if (options.value?.length > 0) {
      temporary.item.parentId = options.value[0].value
      validate.item.parentId = true
    } else {
      temporary.item.parentId = null
      validate.item.parentId = false
    }
  } else {
    log.error('No parent table to make selection', { name: 'ParentIdSelect:onMounted' })
  }
})

function validateInput(): void {
  validate.item.parentId = !!inputRef?.value?.validate()
}
</script>

<template>
  <QSelect
    v-model="temporary.item.parentId"
    ref="inputRef"
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
    @blur="validateInput()"
  />
</template>
