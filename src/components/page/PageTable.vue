<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { type DexieTable, TableAction, TableField } from '@/constants/data-enums'
import { type Ref, ref, onMounted, computed } from 'vue'
import { useTableManager } from '@/use/useTableManager'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useInputProvide } from '@/use/useInputProvide'
import { db } from '@/services/LocalDatabase.js'
import PageDialog from '@/components/dialogs/PageDialog.vue'
import PageInspect from '@/components/page/PageInspect.vue'

const { idModel, idValidate } = useInputProvide(TableField.ID)

const props = defineProps<{
  table: DexieTable
}>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const { tableManager } = useTableManager(props.table)

const searchFilter: Ref<string> = ref('')
const rows: Ref<any[]> = ref([])
const columns: Ref<any[]> = ref([])
const columnOptions: Ref<any[]> = ref([])
const visibleColumns: Ref<string[]> = ref([])
// Selected Row (Page Dialog)
const pageDialog: Ref<boolean> = ref(false)
const selectedItem: Ref<any> = ref({})
const selectedAction: Ref<TableAction | ''> = ref('')
const selectedLabel: Ref<string> = ref('')
const selectedCanSave: Ref<boolean | undefined> = ref(false)

// TEST
const fieldComponent = computed(() => {
  return tableManager?.columns[0].component
})

onMounted(async () => {
  rows.value = await tableManager?.rows()
  columns.value = tableManager?.columns
  columnOptions.value = tableManager?.columnOptions
  visibleColumns.value = tableManager?.visibleColumns
})

async function updateTableRows(): Promise<void> {
  try {
    rows.value = await tableManager?.rows()
  } catch (error) {
    log.error('updateTableRows', error)
  }
}

async function updateDialog(event: any): Promise<void> {
  await updateTableRows()
  selectedItem.value = {}
  selectedAction.value = ''
  selectedLabel.value = ''
  selectedCanSave.value = false
  pageDialog.value = !!event
}

async function onCreate(): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.CREATE)) {
    selectedItem.value = {}
    selectedAction.value = TableAction.CREATE
    selectedLabel.value = tableManager?.label('singular')
    selectedCanSave.value = true
    pageDialog.value = true
  } else {
    log.warn(`Create not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onEdit(id: string): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.UPDATE)) {
    selectedItem.value = await db.getById(props.table, id)
    selectedAction.value = TableAction.UPDATE
    selectedLabel.value = tableManager?.label('singular')
    selectedCanSave.value = true
    pageDialog.value = true
  } else {
    log.warn(`Update not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onReport(id: string): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.REPORT)) {
    selectedItem.value = await db.getById(props.table, id)
    selectedAction.value = TableAction.REPORT
    selectedLabel.value = tableManager?.label('singular')
    selectedCanSave.value = false
    pageDialog.value = true
  } else {
    log.warn(`Report not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onInspect(id: string): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.INSPECT)) {
    selectedItem.value = await db.getById(props.table, id)
    selectedAction.value = TableAction.INSPECT
    selectedLabel.value = tableManager?.label('singular')
    selectedCanSave.value = false
    pageDialog.value = true
  } else {
    log.warn(`Inspect not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onClear(): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.CLEAR)) {
    confirmDialog(
      'Clear',
      `Permanently delete all data from ${tableManager?.label('plural')} table?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await db.clear(props.table)
          await updateTableRows()
        } catch (error) {
          log.error('onClear', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onDelete(id: string): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.DELETE)) {
    confirmDialog(
      'Delete',
      `Permanently delete "${id}" from ${tableManager?.label('plural')} table?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await db.deleteById(props.table, id)
          await updateTableRows()
        } catch (error) {
          log.error('onDelete', error)
        }
      }
    )
  } else {
    log.warn(`Delete not supported for ${tableManager?.label('plural')} table`)
  }
}

async function onSaved(): Promise<void> {
  if (tableManager?.supportedActions?.includes(TableAction.CREATE)) {
    console.log('create - save')
  } else if (tableManager?.supportedActions?.includes(TableAction.UPDATE)) {
    console.log('update - save')
  } else {
    log.warn(`Save not supported for ${tableManager?.label('plural')} table`)
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
      <div class="q-table__title text-weight-bold">{{ tableManager?.label('plural') }}</div>
      <QSpace />
      <!-- Search Input -->
      <QInput
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
          v-if="tableManager?.supportedActions?.includes(TableAction.CREATE)"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onCreate()"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="tableManager?.supportedActions?.includes(TableAction.CLEAR)"
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
            v-if="tableManager?.supportedActions?.includes(TableAction.REPORT)"
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
            v-if="tableManager?.supportedActions?.includes(TableAction.INSPECT)"
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
            v-if="tableManager?.supportedActions?.includes(TableAction.UPDATE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="onEdit(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            v-if="tableManager?.supportedActions?.includes(TableAction.DELETE)"
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
  <PageDialog
    :dialog="pageDialog"
    :action="selectedAction"
    :label="selectedLabel"
    :canSave="selectedCanSave"
    @update:dialog="updateDialog($event)"
    @on-save="onSaved()"
  >
    <PageInspect
      v-if="selectedAction === TableAction.INSPECT"
      :selectedItem="selectedItem"
      :tableColumns="tableManager?.columns"
    />
    <!-- Other page table action components needed! -->
  </PageDialog>

  <!-- Async component TEST -->
  <component :is="fieldComponent" />
</template>
