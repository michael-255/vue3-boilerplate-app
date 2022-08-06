<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { type DexieTable, TableOperation } from '@/constants/data-enums'
import { type Ref, ref, onMounted } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DB } from '@/services/LocalDatabase'
import { useTableManager } from '@/use/useTableManager.js'
import PageDialog from '@/components/dialogs/PageDialog.vue'
import PageInspect from '@/components/page/PageInspect.vue'
import PageCreate from '@/components/page/PageCreate.vue'
import PageUpdate from '@/components/page/PageUpdate.vue'
import PageReport from '@/components/page/PageReport.vue'

const props = defineProps<{
  table: DexieTable
}>()

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const { TM, isSupported, updateRows } = useTableManager(props.table)

const searchFilter: Ref<string> = ref('')
// Selected Row (Page Dialog)
const pageDialog: Ref<boolean> = ref(false)
const selectedItem: Ref<any> = ref({})
const selectedOperation: Ref<TableOperation> = ref(TableOperation.NO_OP)
const selectedLabel: Ref<string> = ref('')
const selectedCanSave: Ref<boolean> = ref(false)

onMounted(async () => await updateRows())

function updateSelectedRefs({
  operation = TableOperation.NO_OP,
  item = {},
  label = '',
  canSave = false,
  dialog = true,
} = {}): void {
  if (isSupported(operation)) {
    selectedItem.value = item
    selectedOperation.value = operation
    selectedLabel.value = label
    selectedCanSave.value = canSave
    pageDialog.value = dialog
  } else {
    log.warn(`${operation} not supported for ${TM.labelPlural} table`)
  }
}

async function updateDialog(event: any): Promise<void> {
  await updateRows()
  selectedItem.value = {}
  selectedOperation.value = TableOperation.NO_OP
  selectedLabel.value = ''
  selectedCanSave.value = false
  pageDialog.value = !!event
}

async function onCreateDialog(): Promise<void> {
  updateSelectedRefs({ operation: TableOperation.CREATE, label: TM.labelSingular, canSave: true })
}

async function onEditDialog(id: string): Promise<void> {
  updateSelectedRefs({
    operation: TableOperation.UPDATE,
    item: await DB.getById(props.table, id),
    label: TM.labelSingular,
    canSave: true,
  })
}

async function onReportDialog(id: string): Promise<void> {
  updateSelectedRefs({
    operation: TableOperation.REPORT,
    item: await DB.getById(props.table, id),
    label: TM.labelSingular,
  })
}

async function onInspectDialog(id: string): Promise<void> {
  updateSelectedRefs({
    operation: TableOperation.INSPECT,
    item: await DB.getById(props.table, id),
    label: TM.labelSingular,
  })
}

async function onClearDialog(): Promise<void> {
  if (isSupported(TableOperation.CLEAR)) {
    confirmDialog(
      'Clear',
      `Permanently delete all data from ${TM.labelPlural} table?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.clear(props.table)
          await updateRows()
        } catch (error) {
          log.error('onClearDialog', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${TM.labelPlural} table`)
  }
}

async function onDeleteDialog(id: string): Promise<void> {
  if (isSupported(TableOperation.DELETE)) {
    confirmDialog(
      'Delete',
      `Permanently delete "${id}" from ${TM.labelPlural} table?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async () => {
        try {
          await DB.deleteById(props.table, id)
          await updateRows()
        } catch (error) {
          log.error('onDeleteDialog', error)
        }
      }
    )
  } else {
    log.warn(`Delete not supported for ${TM.labelPlural} table`)
  }
}

async function onSave(): Promise<void> {
  if (isSupported(TableOperation.CREATE)) {
    console.log('create - save')
  } else if (isSupported(TableOperation.UPDATE)) {
    console.log('update - save')
  } else {
    log.warn(`Save not supported for ${TM.labelPlural} table`)
  }
}
</script>

<template>
  <QTable
    :rows="TM.rows"
    :columns="TM.columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="TM.visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ TM.labelPlural }}</div>
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
        v-model="TM.visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="TM.columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="isSupported(TableOperation.CREATE)"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onCreateDialog()"
        />
        <!-- Clear Btn -->
        <QBtn
          v-if="isSupported(TableOperation.CLEAR)"
          color="negative"
          label="Clear"
          @click="onClearDialog()"
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
            v-if="isSupported(TableOperation.REPORT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="onReportDialog(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <!-- Details Btn -->
          <QBtn
            v-if="isSupported(TableOperation.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="onInspectDialog(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <!-- Edit Btn -->
          <QBtn
            v-if="isSupported(TableOperation.UPDATE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="onEditDialog(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            v-if="isSupported(TableOperation.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDeleteDialog(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>

  <!-- Fullscreen Dialog -->
  <PageDialog
    :dialog="pageDialog"
    :action="selectedOperation"
    :label="selectedLabel"
    :canSave="selectedCanSave"
    @update:dialog="updateDialog($event)"
    @on-save="onSave()"
  >
    <PageInspect
      v-if="selectedOperation === TableOperation.INSPECT"
      :selectedItem="selectedItem"
      :tableColumns="TM.columns"
    />
    <PageCreate
      v-if="selectedOperation === TableOperation.CREATE"
      :table="table"
      :tableColumns="TM.columns"
    />
    <PageUpdate
      v-if="selectedOperation === TableOperation.UPDATE"
      :table="table"
      :tableColumns="TM.columns"
    />
    <PageReport v-if="selectedOperation === TableOperation.REPORT" :table="table" />
  </PageDialog>
</template>
