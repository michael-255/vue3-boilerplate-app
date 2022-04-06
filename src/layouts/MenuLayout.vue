<script setup lang="ts">
import { QBtn, QLayout, QHeader, QToolbar, QToolbarTitle, QDrawer, QPageContainer } from 'quasar'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <QLayout elevated view="hHh lpR lFf">
    <QHeader bordered class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <QToolbarTitle> MenuLayout </QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div>
        <RouterLink to="/">Home</RouterLink>
      </div>
      <div>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </div>
      <div>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div>
        <RouterLink to="/test123">NotFound</RouterLink>
      </div>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
