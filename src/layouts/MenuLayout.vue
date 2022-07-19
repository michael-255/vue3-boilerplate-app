<script setup lang="ts">
import {
  QBtn,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QDrawer,
  QPageContainer,
  QList,
  QSeparator,
  QBtnDropdown,
  QItem,
  QItemSection,
  QItemLabel,
} from 'quasar'
import DrawerItem from '@/components/drawer/DrawerItem.vue'
import { Views, Icon } from '@/constants/ui-enums'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

/**
 * @todo
 */
function onItemClick() {
  console.log('hi')
}
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="ui.toggleDrawer()" />

        <QToolbarTitle>Fitness Tracker</QToolbarTitle>

        <QBtnDropdown flat dense rounded :dropdown-icon="Icon.SETTINGS">
          <QList>
            <QItem clickable v-close-popup @click="onItemClick">
              <QItemSection>
                <QItemLabel>Import / Export</QItemLabel>
              </QItemSection>
            </QItem>
          </QList>
        </QBtnDropdown>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: Views.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />
        <DrawerItem :to="{ name: Views.ACTIVE }" :icon="Icon.ACTIVE" label="Active" />

        <QSeparator />

        <DrawerItem :to="{ name: Views.EXAMPLE }" :icon="Icon.EXAMPLE" label="Examples" />

        <QSeparator />

        <DrawerItem :to="{ name: Views.LOGS }" :icon="Icon.APPLOGS" label="Application Logs" />
        <DrawerItem :to="{ name: Views.OPTIONS }" :icon="Icon.SETTINGS" label="Options" />
        <DrawerItem :to="{ name: Views.ABOUT }" :icon="Icon.INFO" label="About" />
        <DrawerItem to="/404" :icon="Icon.WARN" label="Example 404" />
      </QList>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
