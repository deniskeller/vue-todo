import type { Todo } from '@/store/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
// const API_URL = 'http://localhost:3001/todos';
// const API_URL = 'https://680a3fd11f1a52874cdfcbb4.mockapi.io/api/todos/todos';

const mockTodos = [
  {
    id: '1',
    title: 'kek',
    completed: true,
    order: 1,
    createdAt: '12'
  },
  {
    id: '2',
    title: 'lol',
    completed: false,
    order: 2,
    createdAt: '1211'
  }
];

export const useTodoStore = defineStore('todos', () => {
  // State
  const todos = ref<Todo[]>(mockTodos);

  const status = ref<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(5);
  const draggedTodo = ref<Todo | null>(null);

  return {
    // State
    todos,
    status,
    error,
    currentPage,
    itemsPerPage,
    draggedTodo
  };
});
