<script setup lang="ts">
  import { useTodoStore } from '@/stores/todos';
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  const todoStore = useTodoStore();

  onMounted(() => {
    if (todoStore.status === 'idle') todoStore.loadTodos();
  });

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
