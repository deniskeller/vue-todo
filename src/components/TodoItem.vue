<script setup lang="ts">
  import useOnClickOutside from '@/hooks/useOnClickOutside';
  import type { Todo } from '@/store/types';
  import { computed, ref } from 'vue';

  const props = defineProps<{
    todo: Todo;
    index: number;
  }>();

  const emit = defineEmits<{
    (e: 'toggleTodo', todo: Todo): void;
    (e: 'deleteTodo', id: string): void;
    (e: 'editTodo', id: string): void;
  }>();

  //  ВЫЗОВ МЕНЮ ЗАДАЧИ
  const isActive = ref(false);
  const isDragging = ref(false);
  const classObject = computed(() => ({
    '!bg-[rgba(176,203,247,0.2)] active-parent': isActive.value,
    'opacity-[0.5]': isDragging.value
  }));

  const handleToggleMenu = () => {
    isActive.value = !isActive.value;
  };
  const todoRef = ref<HTMLElement | null>(null);
  useOnClickOutside(todoRef, () => {
    isActive.value = false;
  });

  // ОБРЕЗКА ТЕКСТА ЕСЛИ НЕ ВМЕЩАЕТСЯ
  const computedSizeTitle = computed(() => {
    if (props.todo.title.length < 30) return props.todo.title;
    return props.todo.title.slice(0, 30) + '...';
  });

  // СМЕНА СТАТУСА ЗАДАЧИ
  const handleToggle = () => {
    emit('toggleTodo', props.todo);
    isActive.value = false;
  };

  // УДАЛЕНИЕ ЗАДАЧИ
  const handleDelete = () => {
    emit('deleteTodo', props.todo.id);
    isActive.value = false;
  };

  // РЕДАКТИРОВАНИЕ ЗАДАЧИ
  const handleEdit = () => {
    emit('editTodo', props.todo.id);
    isActive.value = false;
  };

</script>

<template>
  <div
    ref="todoRef"
    class="group bg-white rounded-[3px] shadow-[0_1px_0_rgba(9,30,66,0.25)] flex items-center w-full min-h-[50px] py-[3px] pr-[45px] pl-[15px] relative no-underline hover:bg-[rgba(176,203,247,0.2)] opacity-[1]"
    :class="classObject"
    draggable
  >
    <span
      :class="{'line-through' : todo.completed}"
      :title="todo.title"
    >
      {{ index + 1 }}) {{ computedSizeTitle }}
    </span>

    <div
      className="hidden absolute right-[15px] w-5 h-5 cursor-pointer group-hover:block group-[.active-parent]:block"
      @click="handleToggleMenu"
    >
      <svg
        className="w-[24px] h-[24px] hover:fill-black group-[.active-parent]:fill-black"
        fill="#ccc"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        <path
          d="M0 0h24v24H0z"
          fill="none"
        />
      </svg>
    </div>

    <div
      class="absolute right-[-20px] top-[55px] w-auto z-[1000] -translate-x-5  transition-all duration-200 ease-in-out transform"
      :class="[isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0']"
    >
      <div
        className="bg-black/60 rounded-[3px] clear-both text-gray-200 block w-auto float-right mb-1 py-[6px] pr-[12px] pl-[8px] no-underline transition-transform duration-85 ease-in-out hover:bg-black/80 hover:text-white hover:translate-x-[5px] cursor-pointer shadow-[1px_2px_10px_rgba(0,0,0,0.35)]"
        @click="handleToggle"
      >
        {{ todo.completed ? 'Не выполнено' : 'Выполнено' }}
      </div>

      <div
        className="bg-black/60 rounded-[3px] clear-both text-gray-200 block w-auto float-right mb-1 py-[6px] pr-[12px] pl-[8px] no-underline transition-transform duration-85 ease-in-out hover:bg-black/80 hover:text-white hover:translate-x-[5px] cursor-pointer shadow-[1px_2px_10px_rgba(0,0,0,0.35)]"
        @click="handleEdit"
      >
        Редактировать
      </div>
      <div
        className="bg-black/60 rounded-[3px] clear-both text-gray-200 block w-auto float-right mb-1 py-[6px] pr-[12px] pl-[8px] no-underline transition-transform duration-85 ease-in-out hover:bg-black/80 hover:text-white hover:translate-x-[5px] cursor-pointer shadow-[1px_2px_10px_rgba(0,0,0,0.35)]"
        @click="handleDelete"
      >
        Удалить
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
