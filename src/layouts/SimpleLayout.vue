<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <h2>Simple Layout</h2>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/test123">NotFound</RouterLink>
  </nav>
  <slot />
</template>
