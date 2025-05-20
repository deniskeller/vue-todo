<script setup lang="ts">
  import TodoItem from '@/components/TodoItem.vue';
  import { computed, ref } from 'vue';
  import { useTodoStore } from '@/store/todos';
  import { Todo } from '@/store/types';
  import TodoLoader from '@/components/TodoLoader.vue';

  // interface Todo {
  //   id: number;
  //   title: string;
  //   completed: boolean;
  // }

  const todoStore = useTodoStore();
  // console.log('todos: ', todoStore.todos);

  // type FilterStatus = 'all' | 'completed' | 'active';
  // type ItemsPerPage = 5 | 10 | 20;

  // const route = useRoute();
  // const todos = ref<Todo[]>([]);
  // const inputError = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const error = ref<boolean>(false);
  const title = ref<string>("");
  // const sortType = ref<FilterStatus>('all');

  // СОЗДАНИЕ НОВОЙ ЗАДАЧИ
  const computedSubmitDisabled = computed(() => !title.value);
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (title.value !== '') {
      try {
        // const order =
        //   todos.value.length > 0 ? Math.max(...todos.value.map(t => t.order)) + 1 : 1;

        // await dispatch(
        //   createTodo({
        //     title,
        //     completed: false,
        //     // order: Date.now(),
        //     order: order,
        //     createdAt: new Date().toISOString()
        //   })
        // );
        // setTitle('');
        // const pageCount = Math.ceil((todos.value.length + 1) / itemsPerPage);
        // if (pageCount > 1) navigate(`/page/${pageCount}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.log('error111: ', error);
      }
    } else { /* empty */ }
  };

  // СМЕНА СТАТУСА ЗАДАЧИ
  const handleToggleTodo = (todo: Todo) => {
    // eslint-disable-next-line no-console
    console.log('handleToggleTodo todo: ', todo);
  };

  // УДАЛЕНИЕ ЗАДАЧИ
  const handleDeleteTodo = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('handleDeleteTodo id: ', id);
  };

  // РЕДАКТИРОВАНИЕ ЗАДАЧИ
  const handleEditTodo = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('handleEditTodo id: ', id);
  };

  // const pageNumber = computed(()=> {
  //   const page = Number(route.params.pageNumber);
  //   return page;
  // });
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
          className="block text-base leading-5	text-[#172b4d]	bg-white	w-full	h-auto max-h-[162px] min-h-[70px]	overflow-y-auto	p-0	border-none	shadow-none	overflow-hidden break-words	resize-none outline-none"
          placeholder="Введите текст задачи..."
        />
      </div>

      <div className="flex flex-row items-center relative">
        <button
          className="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 mr-[15px] px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          :disabled="computedSubmitDisabled"
          title="Добавить новую задачу"
          type="submit"
        >
          Добавить
        </button>

        <button
          className="group leading-8 w-[25px]	h-[25px] mr-auto relative cursor-pointer"
          title="Очистить текст задачи"
          type="button"
          @click="title=''"
        >
          <span
            className="block w-full h-[3px] bg-[#6b778c] absolute top-[calc(50%-1px)] rotate-45 before:content-[''] before:block before:w-full before:h-[3px] before:bg-[#6b778c]
    before:absolute before:rotate-90 group-hover:bg-black group-hover:before:bg-black transition-all duration-[500ms] ease-in-out before:transition-all before:duration-[500ms]"
          />
        </button>

        <!-- <BaseSelect
          class-name="ml-[10px]"
          initial-value="{sortByItem}"
          options="{sortByList}"
          on-change="{handleSortBy}"
        />

        <BaseSelect
          class-name="ml-[10px]"
          initial-value="{itemsPerPageList[0]}"
          options="{itemsPerPageList}"
          on-change="{handleItemsPerPage}"
        /> -->
      </div>
    </form>

    <div className="flex justify-between mb-5">
      <button
        className="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
        title="Удаление завершенных задач"
        type="button"
      >
        Удалить завершенные задачи
      </button>

      <button
        className="bg-[#5aac44] shadow-none border-none text-white cursor-pointer inline-block font-semibold leading-5 px-[15px] py-[12px] text-center rounded-[3px] outline-none hover:bg-[#61bd4f] transition-all duration-[500ms] ease-in-out disabled:opacity-50 disabled:pointer-events-none"
        title="Удаление все задач"
        type="button"
      >
        Удалить все задачи
      </button>
    </div>

    <TodoLoader v-if="loading" />

    <div v-if="error">
      {{ error }}
    </div>

    <div
      v-if="todoStore.todos.length"
      class="task-list"
    >
      <TodoItem
        v-for="(todo, index) in todoStore.todos"
        :key="todo.id"
        :index="index"
        :todo="todo"
        @delete-todo="handleDeleteTodo"
        @edit-todo="handleEditTodo"
        @toggle-todo="handleToggleTodo"
      />
    </div>

    <div
      v-else
      class="task-empty"
    >
      У вас пока нет задач
    </div>

    <!-- <div
      v-if="showPagination"
      class="task-control"
    >
      <RouterLink
        :class="{'disable': prevDisable}"
        :to="'/page/' + (pageNumber-1)"
        class="task-control__prev-btn task-control--btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
        </svg>
      </RouterLink>

      <RouterLink
        :class="{'disable': nextDisable}"
        :to="'/page/'+ (pageNumber+1)"
        class="task-control__next-btn task-control--btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
        </svg>
      </RouterLink>
    </div> -->
  </div>
</template>

<style scoped>
</style>
