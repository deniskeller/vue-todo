<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useTodoStore } from '@/stores/todos';
  import { Todo } from '@/stores/types';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import TodoLoader from '@/components/content/TodoLoader.vue';
  import TodoItem from '@/components/content/TodoItem.vue';
  import PaginationTodos from '@/components/content/PaginationTodos.vue';
  import BaseSelect from '@/components/base/BaseSelect.vue';
  import type { SelectItem } from '@/types';

  type FilterStatus = 'all' | 'completed' | 'active';
  type ItemsPerPage = 5 | 10 | 20;

  const router = useRouter();
  const route = useRoute();
  const todoStore = useTodoStore();
  const { todos, status, error, currentPage, itemsPerPage } = storeToRefs(todoStore);

  // СОЗДАНИЕ НОВОЙ ЗАДАЧИ
  const title = ref<string>("");
  const computedSubmitDisabled = computed(() => !title.value);
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (title.value !== '') {
      try {
        const order =
          todos.value.length > 0 ? Math.max(...todos.value.map(t => t.order)) + 1 : 1;

        await todoStore.createTodo({
          title: title.value,
          completed: false,
          order: order,
          createdAt: new Date().toISOString()
        });
        title.value = '';
        if (pageCount.value > 1) router.push(`/page/${pageCount.value}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error111: ', error);
      }
    } else { /* empty */ }
  };

  // СМЕНА СТАТУСА ЗАДАЧИ
  const handleToggleTodo = (todo: Todo) => {
    todoStore.updateTodo({ ...todo, completed: !todo.completed });
  };

  // РЕДАКТИРОВАНИЕ ЗАДАЧИ
  const handleEditTodo = (id: string) => {
    router.push('/edit/' + id);
  };

  // УДАЛЕНИЕ ЗАДАЧИ
  const handleDeleteTodo = (id: string) => {
    todoStore.deleteTodo(id);
  };

  // УДАЛЕНИЕ ЗАВЕРШЕННЫХ ЗАДАЧ
  const completedTodosCount = computed(() => {
    return todos.value.filter(todo => todo.completed).length;
  });
  const handleDeleteCompletedTodos = async () => {
    if (
      window.confirm('Вы уверены, что хотите удалить все выполненные задачи?')
    ) {
      await todoStore.deleteCompletedTodos();
    }
  };

  // УДАЛЕНИЕ ВСЕХ ЗАДАЧ
  const handleDeleteAllTodos = async () => {
    if (window.confirm('Вы уверены, что хотите удалить все задачи?')) {
      await todoStore.deleteAllTodos();
      router.push('/page/1');
    }
  };

  // СОРТИРОВКА СПИСКА ЗАДАЧ ПО СТАТУСУ
  const sortType = ref<FilterStatus>('all');
  const sortByList = [
    { label: 'Все', value: 'all' },
    { label: 'Завершенные', value: 'completed' },
    { label: 'Активные', value: 'active' }
  ];
  const sortByItem = ref<SelectItem>(sortByList[0]);
  const handleSortBy = (value: SelectItem) => {
    sortByItem.value = value;
    sortType.value = value.value as FilterStatus;
    router.push('/page/1');
  };

  // ---------- ОТРИСОВКА КОЛ-ВА ЗАДАЧ
  const itemsPerPageList = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 }
  ];
  const handleItemsPerPage = (value: SelectItem) => {
    todoStore.setItemsPerPage(value.value as ItemsPerPage);
  };

  // ПАГИНАЦИЯ
  const handlePageChange = (page: number) => {
    todoStore.setCurrentPage(page);
    router.push(`/page/${page}`);
  };
  const filteredTodos = computed(() => {
    return todos.value.filter(todo => {
      if (sortType.value === 'active') return !todo.completed;
      if (sortType.value === 'completed') return todo.completed;
      return true;
    });
  });

  // расчет задач для постраничного вывода
  const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = currentPage.value * itemsPerPage.value;
    return filteredTodos.value.slice(start, end);
  });

  // РАСЧЕТ КОЛ-ВА СТРАНИЦ
  const pageCount = computed(() => {
    return Math.ceil(filteredTodos.value.length / itemsPerPage.value);
  });

  watch(
    () => route.params.pageNumber,
    pageNumber => {
      const page = pageNumber ? +pageNumber : 1;
      todoStore.setCurrentPage(page);
    },
    { immediate: true }
  );

  watch(
    [() => filteredTodos.value.length, () => route.params.pageNumber],
    () => {
      if (!filteredTodos.value.length) return;
      const pageNumber = route.params.pageNumber ? +route.params.pageNumber : 1;
      if (pageNumber <= 0) router.replace('/page/1');
      if (pageNumber > pageCount.value) router.replace(`/page/${pageCount.value}`);
    }
  );

</script>

<template>
  <div class="max-w-[500px] w-full mx-auto bg-[#ebecf0] rounded-[5px] mt-[50px] p-[30px_13px_13px]">
    <h1 class="text-[20px] leading-[24px] font-semibold mb-[15px]">
      Задачи
    </h1>

    <form
      class="mb-[20px]"
      @submit.prevent="handleSubmit"
    >
      <div
        class="overflow-hidden p-[6px_8px_2px] relative z-10 bg-white mb-[15px] rounded-[5px]"
      >
        <textarea
          v-model="title"
          class="block text-base leading-5	text-[#172b4d]	bg-white	w-full	h-auto max-h-[162px] min-h-[70px]	overflow-y-auto	p-0	border-none	shadow-none	overflow-hidden break-words	resize-none outline-none"
          placeholder="Введите текст задачи..."
        />
      </div>

      <div class="flex flex-row items-center relative">
        <button
          class="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 mr-[15px] px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          :disabled="computedSubmitDisabled"
          title="Добавить новую задачу"
          type="submit"
        >
          Добавить
        </button>

        <button
          class="group leading-8 w-[25px]	h-[25px] mr-auto relative cursor-pointer"
          title="Очистить текст задачи"
          type="button"
          @click="title=''"
        >
          <span
            class="block w-full h-[3px] bg-[#6b778c] absolute top-[calc(50%-1px)] rotate-45 before:content-[''] before:block before:w-full before:h-[3px] before:bg-[#6b778c]
    before:absolute before:rotate-90 group-hover:bg-black group-hover:before:bg-black transition-all duration-[500ms] ease-in-out before:transition-all before:duration-[500ms]"
          />
        </button>

        <BaseSelect
          :class-name="'ml-[10px]'"
          :initial-value="sortByItem"
          :options="sortByList"
          @change="handleSortBy"
        />

        <BaseSelect
          :class-name="'ml-[10px]'"
          :initial-value="itemsPerPageList[0]"
          :options="itemsPerPageList"
          @change="handleItemsPerPage"
        />
      </div>
    </form>

    <div class="flex justify-between mb-5">
      <button
        class="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
        :disabled="completedTodosCount === 0"
        title="Удаление завершенных задач"
        type="button"
        @click="handleDeleteCompletedTodos"
      >
        Удалить завершенные задачи
      </button>

      <button
        class="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
        :disabled="todos.length === 0"
        title="Удаление всех задач"
        type="button"
        @click="handleDeleteAllTodos"
      >
        Удалить все задачи
      </button>
    </div>

    <TodoLoader v-if="status === 'loading'" />

    <div v-if="status === 'failed'">
      {{ error }}
    </div>

    <template v-if="status === 'succeeded'">
      <div
        v-if="filteredTodos.length > 0"
        class="grid gap-[8px]"
      >
        <TodoItem
          v-for="(todo, index) in paginatedTodos"
          :key="todo.id"
          :index="(currentPage - 1) * itemsPerPage + index"
          :todo="todo"
          @delete-todo="handleDeleteTodo"
          @edit-todo="handleEditTodo"
          @toggle-todo="handleToggleTodo"
        />
      </div>

      <div
        v-else
        class="text-center"
      >
        У вас пока нет задач
      </div>
    </template>

    <PaginationTodos
      v-if="pageCount > 1"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="filteredTodos.length"
      @page-change="handlePageChange"
    />
  </div>
</template>

<style scoped>
</style>
