<script setup lang="ts">
  import router from '@/router';
  import { useTodoStore } from '@/stores/todos';
  import { Todo } from '@/stores/types';
  import { computed, ref, watch } from 'vue';

  const todoStore = useTodoStore();
  const todoTitle = ref<string>("");
  const computedSubmitDisabled = computed(() => !todoTitle.value);
  const currentTodoId = computed(() => router.currentRoute.value.fullPath);
  const currentTodo = computed<Todo | undefined>(() => todoStore.todos.find(t => t.id === currentTodoId.value.split('/')[2]));

  watch(
    () => currentTodo.value,
    todo => {
      if (todo) {
        todoTitle.value = todo.title;
      } else {
        router.back();
      }
    },
    { immediate: true }
  );

  const handleSubmit = () => {
    if (!currentTodo.value) return;
    try {
      todoStore.updateTodo({
        ...currentTodo.value,
        title: todoTitle.value.trim()
      });
      router.back();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
  </script>

<template>
  <div class="max-w-[500px] w-full mx-auto bg-[#ebecf0] rounded-[5px] mt-[50px] p-[30px_13px_10px] TodoEdit">
    <form @submit.prevent="handleSubmit">
      <div
        class="overflow-hidden p-[6px_8px_2px] relative z-10 bg-white mb-[15px] rounded-[5px]"
      >
        <textarea
          v-model="todoTitle"
          class="block text-base leading-5 text-[#172b4d] bg-white w-full h-auto max-h-[162px] min-h-[70px] overflow-y-auto p-0 border-none shadow-none overflow-hidden break-words resize-none outline-none"
          placeholder="Введите текст задачи..."
        />
      </div>

      <div class="flex justify-between items-center">
        <button
          class="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 mr-[15px] px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          :disabled="computedSubmitDisabled"
          type="submit"
        >
          Сохранить
        </button>

        <button
          class="text-xl leading-6 font-semibold pl-2.5 cursor-pointer"
          type="button"
          @click="router.back()"
        >
          Назад
        </button>
      </div>
    </form>
  </div>
</template>
