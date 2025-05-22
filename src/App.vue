<script setup lang="ts">
  import { useTodoStore } from '@/stores/todos';
  import { onMounted } from 'vue';
  import { RouterView, useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const todoStore = useTodoStore();

  onMounted(() => {
    if (todoStore.status === 'idle') todoStore.loadTodos();
  });

  onMounted(() => {
    if (route.path === '/') router.push("/page/1");
  });

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
