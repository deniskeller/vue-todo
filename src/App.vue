<script setup lang="ts">
  import { useTodoStore } from '@/stores/todos';
  import { watch } from 'vue';
  import { RouterView } from 'vue-router';
  const todoStore = useTodoStore();

  watch(
    () => todoStore.status,
    status => {
      if (status === 'idle') {
        todoStore.loadTodos();
      }
    },
    { immediate: true }
  );
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
