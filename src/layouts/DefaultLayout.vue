<script setup lang="ts">
import { QBtn, QLayout, QHeader, QToolbar, QToolbarTitle, QPageContainer } from 'quasar'
import { useRouter } from 'vue-router'
import { Views } from '@/constants'

const router = useRouter()
</script>

<template>
  <QLayout elevated view="hHh lpR lFf">
    <QHeader bordered class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="home" @click="router.push({ name: Views.DASHBOARD })" />

        <QToolbarTitle>Back to Dashboard</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer class="q-mx-sm">
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
