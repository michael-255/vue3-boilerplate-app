<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.meta)
</script>

<template>
  <h1>404 Not Found</h1>
</template>
