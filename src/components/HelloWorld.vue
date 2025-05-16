<script setup lang="ts">
import { ref, type PropType } from 'vue';

const props = defineProps({
  is: {
    type: [String],
    default: ''
  },
  id: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  }
});
// console.log('id: ', props.id);
// console.log('is: ', props.is);

const count = ref(0);
</script>

<template>
  <h1>{{ props.is }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
  </div>
</template>

<style scoped></style>
