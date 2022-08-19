<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { type AppTable, Operation, Field } from '@/constants/data-enums'
import { type Ref, ref, onMounted } from 'vue'
import type { DataObject } from '@/constants/types-interfaces'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import PageDialog from '@/components/dialogs/PageDialog.vue'
import PageInspect from '@/components/page-table/PageInspect.vue'
import PageCreate from '@/components/page-table/PageCreate.vue'
import PageUpdate from '@/components/page-table/PageUpdate.vue'
import PageReport from '@/components/page-table/PageReport.vue'
import { useSelectedItemStore } from '@/stores/selected-item'
import { useUIStore } from '@/stores/ui'
import { useValidateItemStore } from '@/stores/validate-item'
import { useTemporaryItemStore } from '@/stores/temporary-item'
import { getTableActions } from '@/helpers/table-actions'
import { getTableColumns } from '@/helpers/table-columns'
import { getTableVisibleColumns } from '@/helpers/table-visible-columns'
import { getTableLabel } from '@/helpers/table-label'
import { isSupported } from '@/helpers/table-operations'

const ui = useUIStore()
const selected = useSelectedItemStore()
const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()

/**
 * Component allows viewing of table data and actions on that data.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

// Page Refs
const searchFilter: Ref<string> = ref('')
// Table Refs
const rows: Ref<DataObject[]> = ref([])
const columns: Ref<any[]> = ref([])
const columnOptions: Ref<any[]> = ref([])
const visibleColumns: Ref<Field[]> = ref([])

/**
 * Sets table properties and gets the latest data.
 */
onMounted(async () => {
  columns.value = getTableColumns(props.table, 'props')
  columnOptions.value = getTableColumns(props.table, 'options')
  visibleColumns.value = getTableVisibleColumns(props.table)
  ui.pageTable.itemLabel = getTableLabel(props.table, 'singular')
  await updateRows()
})

/**
 * Loads the latest data into the data table rows.
 */
async function updateRows(): Promise<void> {
  const { getRows } = getTableActions(props.table)
  if (getRows) {
    rows.value = await getRows()
  } else {
    log.critical('Missing getRows action', { name: 'PageTable:updateRows' })
  }
}

/**
 * Update dialog event resets page dialog refs and sets dialog to casted boolean of event result.
 * @param bool
 */
async function updateDialog(bool: boolean): Promise<void> {
  await updateRows()
  selected.$reset()
  validate.$reset()
  temporary.$reset()
  ui.pageTable.operation = Operation.NO_OP
  ui.pageTable.dialog = !!bool // Always last so everything else is updated before dialog changes
}

/**
 * Create row action opens the dialog with the settings below.
 */
async function onCreate(): Promise<void> {
  selected.$reset()
  validate.$reset()
  temporary.$reset()
  ui.pageTable.operation = Operation.CREATE
  ui.pageTable.dialog = true
}

/**
 * Update row action opens the dialog with the settings below.
 */
async function onUpdate(id: string): Promise<void> {
  validate.$reset()
  temporary.$reset()
  selected.item = Object.assign(selected.item, await DB.getById(props.table, id))
  ui.pageTable.operation = Operation.UPDATE
  ui.pageTable.dialog = true
}

/**
 * Report row action opens the dialog with the settings below.
 */
async function onReport(id: string): Promise<void> {
  validate.$reset()
  temporary.$reset()
  selected.item = Object.assign(selected.item, await DB.getById(props.table, id))
  ui.pageTable.operation = Operation.REPORT
  ui.pageTable.dialog = true
}

/**
 * Inspect row action opens the dialog with the settings below.
 */
async function onInspect(id: string): Promise<void> {
  validate.$reset()
  temporary.$reset()
  selected.item = Object.assign(selected.item, await DB.getById(props.table, id))
  ui.pageTable.operation = Operation.INSPECT
  ui.pageTable.dialog = true
}

/**
 * Confirm clearing all data in this table.
 */
async function onClear(): Promise<void> {
  if (isSupported(props.table, Operation.CLEAR)) {
    confirmDialog(
      'Clear',
      `Permanently delete all ${getTableLabel(props.table, 'plural')}?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.clear(props.table)
          await updateRows()
        } catch (error) {
          log.error('onClear', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${getTableLabel(props.table, 'plural')} table`)
  }
}

/**
 * Confirm deleting the clicked item.
 */
async function onDelete(id: string): Promise<void> {
  if (isSupported(props.table, Operation.DELETE)) {
    confirmDialog(
      'Delete',
      `Permanently delete "${id}" from ${getTableLabel(props.table, 'plural')}?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.deleteById(props.table, id)
          await updateRows()
        } catch (error) {
          log.error('onDelete', error)
        }
      }
    )
  } else {
    log.warn(`Delete not supported for ${getTableLabel(props.table, 'plural')} table`)
  }
}
</script>

<template>
  <QTable
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ getTableLabel(table, 'plural') }}</div>
      <QSpace />

      <!-- Search Input -->
      <QInput
        :disable="!rows.length"
        outlined
        dense
        debounce="300"
        v-model="searchFilter"
        placeholder="Search"
        class="q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>

      <!-- Column Select -->
      <QSelect
        v-model="visibleColumns"
        :disable="!rows.length"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="isSupported(table, Operation.CREATE)"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onCreate()"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="isSupported(table, Operation.CLEAR)"
          :disable="!rows.length"
          color="negative"
          label="Clear"
          @click="onClear()"
          class="q-mb-sm"
        />
      </div>
    </template>

    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <!-- Report Btn -->
          <QBtn
            v-if="isSupported(table, Operation.REPORT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="onReport(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <!-- Details Btn -->
          <QBtn
            v-if="isSupported(table, Operation.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="onInspect(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <!-- Edit Btn -->
          <QBtn
            v-if="isSupported(table, Operation.UPDATE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="onUpdate(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            v-if="isSupported(table, Operation.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDelete(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Fullscreen Dialog -->
  <PageDialog>
    <PageInspect v-if="ui.pageTable.operation === Operation.INSPECT" :columns="columns" />
    <PageCreate
      v-else-if="ui.pageTable.operation === Operation.CREATE"
      :table="table"
      @on-create="updateDialog(false)"
    />
    <PageUpdate
      v-else-if="ui.pageTable.operation === Operation.UPDATE"
      :table="table"
      @on-update="updateDialog(false)"
    />
    <PageReport v-else-if="ui.pageTable.operation === Operation.REPORT" :table="table" />
    <div v-else>Selected operation is not supported</div>
  </PageDialog>
</template>
