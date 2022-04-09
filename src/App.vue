<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { defineAsyncComponent, computed } from 'vue'
import { Layouts } from '@/constants'

// Get Layout for View based on router meta property
const route = useRoute()
const routeLayout = computed(() => route?.meta?.layout)
// Use route layout, or the default layout
const layoutComponent = computed(() => {
  return routeLayout.value
    ? defineAsyncComponent(() => import(`./layouts/${routeLayout.value}.vue`))
    : defineAsyncComponent(() => import(`./layouts/${Layouts.DEFAULT}.vue`))
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
