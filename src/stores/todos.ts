import type { NewTodo, Todo } from '@/stores/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const API_URL = 'https://680a3fd11f1a52874cdfcbb4.mockapi.io/api/todos/todos';

// Функция для обработки ошибок
const handleFetchError = async (response: Response, message: string) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || message);
  }
  return response.json();
};

export const useTodoStore = defineStore('todos', () => {
  const router = useRouter();
  // State
  const todos = ref<Todo[]>([]);
  const status = ref<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(5);
  const draggedTodo = ref<Todo | null>(null);

  // Фукнция для определения страницы
  const computedPage = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    if (
      todos.value.slice(startIndex, startIndex + itemsPerPage.value).length ===
        0 &&
      currentPage.value > 1
    ) {
      currentPage.value -= 1;
    }
  };

  // Функция для выведения ошибок
  const handleError = (err: unknown, defaultMessage: string) => {
    if (err instanceof Error) {
      error.value = err.message;
    } else if (typeof err === 'string') {
      error.value = err;
    } else {
      error.value = defaultMessage;
    }
    status.value = 'failed';
    throw err;
  };

  // ---------- Getters
  // // РАСЧЕТ КОЛ-ВА СТРАНИЦ
  // const pageCount = computed(() => {
  //   return Math.ceil(todos.value.length / itemsPerPage.value);
  // });

  // ---------- Actions
  // ПЕРВИЧНАЯ ЗАГРУЗКА ЗАДАЧ
  const loadTodos = async () => {
    try {
      status.value = 'loading';
      error.value = null;

      const response = await fetch(API_URL);
      const data = await handleFetchError(response, 'Ошибка загрузки задач');

      todos.value = data.sort((a: Todo, b: Todo) => a.order - b.order);
      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка загрузки задач');
    }
  };

  // СОЗДАНИЕ НОВОЙ ЗАДАЧИ
  const createTodo = async (todo: NewTodo) => {
    try {
      status.value = 'loading';
      error.value = null;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });

      const newTodo = await handleFetchError(
        response,
        'Ошибка добавления задачи'
      );
      todos.value.push(newTodo);

      const totalPages = Math.ceil(todos.value.length / itemsPerPage.value);
      if (currentPage.value < totalPages) {
        currentPage.value = totalPages;
      }

      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка добавления задачи');
    }
  };

  // ОБНОВЛЕНИЕ СТАТУСА ЗАДАЧИ
  const updateTodo = async (todo: Todo) => {
    try {
      status.value = 'loading';
      error.value = null;

      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });

      const updatedTodo = await handleFetchError(
        response,
        'Ошибка редактирования задачи'
      );
      const index = todos.value.findIndex(t => t.id === updatedTodo.id);

      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }

      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка обновления задачи');
    }
  };

  // УДАЛЕНИЕ ЗАДАЧИ
  const deleteTodo = async (id: string) => {
    try {
      status.value = 'loading';
      error.value = null;

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      await handleFetchError(response, 'Ошибка удаления задачи');
      todos.value = todos.value.filter(todo => todo.id !== id);

      computedPage();
      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка удаления задачи');
    }
  };

  // УДАЛЕНИЕ ВСЕХ ВЫПОЛНЕННЫХ ЗАДАЧИ
  const deleteCompletedTodos = async () => {
    try {
      status.value = 'loading';
      error.value = null;

      const completedTodos = todos.value.filter(todo => todo.completed);

      if (completedTodos.length === 0) {
        throw new Error('Нет выполненных задач для удаления');
      }

      const deleteResults = await Promise.all(
        completedTodos.map(todo =>
          fetch(`${API_URL}/${todo.id}`, { method: 'DELETE' })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
              }
              return { success: true, id: todo.id, error: '' };
            })
            .catch(error => ({
              success: false,
              id: todo.id,
              error: error.message
            }))
        )
      );

      const failedDeletes = deleteResults.filter(r => !r.success);
      if (failedDeletes.length > 0) {
        throw new Error(
          `Не удалось удалить ${failedDeletes.length} задач: ` +
            failedDeletes.map(d => `ID ${d.id} (${d.error})`).join(', ')
        );
      }

      todos.value = todos.value.filter(todo => !todo.completed);
      computedPage();
      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка удаления завершенных задач');
    }
  };

  // УДАЛЕНИЕ ВСЕХ ЗАДАЧИ
  const deleteAllTodos = async () => {
    try {
      status.value = 'loading';
      error.value = null;

      const response = await fetch(API_URL);
      const allTodos = await handleFetchError(
        response,
        'Ошибка получения списка задач'
      );

      if (allTodos.length === 0) {
        throw new Error('Список задач уже пуст');
      }

      const deleteResults = await Promise.all(
        allTodos.map((todo: Todo) =>
          fetch(`${API_URL}/${todo.id}`, { method: 'DELETE' })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
              }
              return { success: true, id: todo.id };
            })
            .catch(error => ({
              success: false,
              id: todo.id,
              error: error.message
            }))
        )
      );

      const failedDeletes = deleteResults.filter(r => !r.success);
      if (failedDeletes.length > 0) {
        throw new Error(
          `Не удалось удалить ${failedDeletes.length} задач: ` +
            failedDeletes.map(d => `ID ${d.id} (${d.error})`).join(', ')
        );
      }

      todos.value = [];
      status.value = 'succeeded';
    } catch (err) {
      handleError(err, 'Ошибка очищения списка задач');
    }
  };

  // ОБНОВЛЕНИЕ пОРЯДКА ЗАДАЧИ
  // на клиенте
  const reorderTodos = (dragIndex: number, hoverIndex: number) => {
    const newTodos = [...todos.value];
    const [removed] = newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, removed);

    newTodos.forEach((todo, index) => {
      todo.order = index + 1;
    });

    todos.value = newTodos;
  };
  // на сервере
  const updateTodoOrder = async (id: string, order: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
      });

      const updatedTodo = await handleFetchError(
        response,
        'Ошибка перемещения задачи'
      );
      const index = todos.value.findIndex(todo => todo.id === updatedTodo.id);

      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }

      todos.value.sort((a, b) => a.order - b.order);
    } catch (err) {
      handleError(err, 'Ошибка перемещения задачи');
    }
  };

  // УСТАНОВКА ТЕКУЩЕЙ СТРАНИЦЫ
  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  // УСТАНОВКА ОТОБРАЖАЕМОГО КОЛ-ВА ЗАДАЧ НА СТРАНИЦЕ
  const setItemsPerPage = (count: number) => {
    itemsPerPage.value = count;
    computedPage();
    router.push(`/page/${currentPage.value}`);
  };

  // ТЕКУЩАЯ ДРАГНДРОП ЗАДАЧА
  const setDraggedTodo = (todo: Todo | null) => {
    draggedTodo.value = todo;
  };

  return {
    todos,
    status,
    error,
    currentPage,
    itemsPerPage,
    draggedTodo,
    // pageCount,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteCompletedTodos,
    deleteAllTodos,
    reorderTodos,
    updateTodoOrder,
    setCurrentPage,
    setItemsPerPage,
    setDraggedTodo
  };
});
