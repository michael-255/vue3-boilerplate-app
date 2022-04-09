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
} from 'quasar'
import DrawerItem from '@/components/shared/DrawerItem.vue'
import { useUIStore } from '@/stores/ui'
import { Paths } from '@/constants'

const ui = useUIStore()
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader bordered elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="ui.toggleDrawer()" />

        <QToolbarTitle>Menu Layout</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="Paths.DASHBOARD" icon="dashboard" label="Dashboard" />
        <DrawerItem :to="Paths.ABOUT" icon="info" label="About" />
        <DrawerItem to="/example404" icon="warning" label="Not Found" />
      </QList>
    </QDrawer>

    <QPageContainer class="q-mx-sm">
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
