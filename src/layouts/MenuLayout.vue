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
} from 'quasar'
import DrawerItem from '@/components/drawer/DrawerItem.vue'
import { Views, Icon, Strings } from '@/constants/ui-enums'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
</script>

<template>
  <QLayout view="hHh LpR lff">
    <QHeader elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round :icon="Icon.MENU" @click="ui.toggleDrawer()" />

        <QToolbarTitle>{{ Strings.APP_NAME }}</QToolbarTitle>

        <QBtn flat dense label="Settings" :to="{ name: Views.SETTINGS }" :icon="Icon.SETTINGS" />
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="220" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: Views.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />

        <QSeparator />

        <DrawerItem :to="{ name: Views.EXAMPLE }" :icon="Icon.EXAMPLE" label="Examples" />

        <QSeparator />

        <DrawerItem :to="{ name: Views.ABOUT }" :icon="Icon.INFO" label="About" />
        <DrawerItem to="/404" :icon="Icon.WARN" label="Example 404" />
      </QList>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
