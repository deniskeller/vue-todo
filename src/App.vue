<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';

  // const route = useRoute();
  onMounted(()=> {
    // route.push("/page/1");
    // const pageNumber = +route.params;

    // console.log(route.path); // текущий путь (/about)
    // console.log(route.name); // имя маршрута (если задано)
    // console.log(route.params); // параметры (/user/:id → { id: '123' })
    // console.log(route.query);
  });

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
