<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { type AppTable, Operation } from '@/constants/data-enums'
import { type Ref, ref, onMounted, onUnmounted } from 'vue'
import { DB } from '@/services/LocalDatabase'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import PageDialog from '@/components/dialogs/PageDialog.vue'
import PageInspect from '@/components/page-table/PageInspect.vue'
import PageCreate from '@/components/page-table/PageCreate.vue'
import PageUpdate from '@/components/page-table/PageUpdate.vue'
import PageReport from '@/components/page-table/PageReport.vue'
import usePageTableStore from '@/stores/page-table'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import useTemporaryItemStore from '@/stores/temporary-item'
import useReportStore from '@/stores/report'
import { getTableActions } from '@/helpers/table-actions'
import { getTableColumns } from '@/helpers/table-columns'
import { getTableVisibleColumns } from '@/helpers/table-visible-columns'
import { getTableLabel } from '@/helpers/table-label'
import { isSupported } from '@/helpers/table-operations'

/**
 * Component allows you to view and perform operations on table data.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const selected = useSelectedItemStore()
const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()
const report = useReportStore()
const pageTable = usePageTableStore()
const searchFilter: Ref<string> = ref('')

/**
 * Sets the page-table store up and loads the table rows.
 */
onMounted(async () => {
  try {
    pageTable.columns = getTableColumns(props.table, 'props')
    pageTable.columnOptions = getTableColumns(props.table, 'options')
    pageTable.visibleColumns = getTableVisibleColumns(props.table)
    pageTable.itemLabel = getTableLabel(props.table, 'singular')
    await updateRows()
  } catch (error) {
    log.error('PageTable:onMounted', error)
  }
})

onUnmounted(() => {
  pageTable.$reset()
})

/**
 * Loads the latest data into the data table rows.
 */
async function updateRows(): Promise<void> {
  const { getRows } = getTableActions(props.table)
  if (getRows) {
    pageTable.rows = await getRows()
  } else {
    log.error('Missing getRows action', { name: 'PageTable:updateRows' })
  }
}

/**
 * Closes the fullscreen dialog after reseting the stores and updating the table rows.
 */
async function closeDialog(): Promise<void> {
  try {
    await updateRows()
    selected.$reset()
    validate.$reset()
    temporary.$reset()
    report.$reset()
    pageTable.operation = Operation.NOOP
    pageTable.dialog = false // Always last so everything else is updated before dialog changes
  } catch (error) {
    log.error('PageTable:closeDialog', error)
  }
}

async function onCreate(): Promise<void> {
  try {
    pageTable.operation = Operation.CREATE
    pageTable.dialog = true
  } catch (error) {
    log.error('PageTable:onCreate', error)
  }
}

async function onUpdate(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getById(props.table, id))
    pageTable.operation = Operation.UPDATE
    pageTable.dialog = true
  } catch (error) {
    log.error('PageTable:onUpdate', error)
  }
}

async function onReport(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getById(props.table, id))
    pageTable.operation = Operation.REPORT
    pageTable.dialog = true
  } catch (error) {
    log.error('PageTable:onReport', error)
  }
}

async function onInspect(id: string): Promise<void> {
  try {
    selected.setItem(await DB.getById(props.table, id))
    pageTable.operation = Operation.INSPECT
    pageTable.dialog = true
  } catch (error) {
    log.error('PageTable:onInspect', error)
  }
}

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
          log.error('PageTable:onClear', error)
        }
      }
    )
  } else {
    log.warn(`Clear not supported for ${getTableLabel(props.table, 'plural')} table`)
  }
}

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
          log.error('PageTable:onDelete', error)
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
    :rows="pageTable.rows"
    :columns="pageTable.columns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="pageTable.visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ getTableLabel(table, 'plural') }}</div>
      <QSpace />

      <!-- Search Input -->
      <QInput
        :disable="!pageTable.rows.length"
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
        v-model="pageTable.visibleColumns"
        :disable="!pageTable.rows.length"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="pageTable.columnOptions"
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
          :disable="!pageTable.rows.length"
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
  <PageDialog @on-dialog-close="closeDialog()">
    <PageInspect v-if="pageTable.operation === Operation.INSPECT" :table="table" />

    <PageCreate
      v-else-if="pageTable.operation === Operation.CREATE"
      :table="table"
      @on-create-confired="closeDialog()"
    />

    <PageUpdate
      v-else-if="pageTable.operation === Operation.UPDATE"
      :table="table"
      @on-update-confired="closeDialog()"
    />

    <PageReport v-else-if="pageTable.operation === Operation.REPORT" :table="table" />

    <div v-else>Selected operation is not supported</div>
  </PageDialog>
</template>
