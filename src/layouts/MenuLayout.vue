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
import { Paths } from '@/constants'
import { ref } from 'vue'

const drawer = ref(false) // Closed by default

function toggleDrawer() {
  drawer.value = !drawer.value
}
</script>

<template>
  <QLayout elevated view="hHh lpR lFf">
    <QHeader bordered class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="toggleDrawer" />

        <QToolbarTitle>Menu Layout</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="Paths.DASHBOARD" icon="dashboard" label="Dashboard" />
        <DrawerItem :to="Paths.ABOUT" icon="info" label="About" />
        <DrawerItem to="/example404" icon="warning" label="Not Found" />
      </QList>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
