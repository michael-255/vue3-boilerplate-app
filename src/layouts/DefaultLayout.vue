<script setup lang="ts">
import { QBtn, QLayout, QHeader, QToolbar, QToolbarTitle, QPageContainer } from 'quasar'
import { useRouter } from 'vue-router'
import { Icon, View } from '@/constants/ui-enums'

/**
 * Layout thats used when no other layout is provided in the routes meta data.
 */

const router = useRouter()
</script>

<template>
  <QLayout elevated view="hHh LpR lff">
    <QHeader bordered class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round :icon="Icon.HOME" @click="router.push({ name: View.DASHBOARD })" />

        <QToolbarTitle>Back to Dashboard</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer class="q-mx-sm">
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
