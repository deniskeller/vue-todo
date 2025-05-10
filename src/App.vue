<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <hello-world
    is="header"
    v-once
    id="uniqueID"
    ref="header"
    my-prop="prop"
  />
</template>

<style scoped></style>
