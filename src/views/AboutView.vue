<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.meta)
</script>

<template>
  <h1>About View</h1>
</template>
