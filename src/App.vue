<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">
        Home
      </RouterLink> |
      <RouterLink to="/">
        About
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
