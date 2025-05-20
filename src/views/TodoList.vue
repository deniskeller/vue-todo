<script setup lang="ts">
  import TodoItem from '@/components/TodoItem.vue';
  import TodoLoader from '@/components/TodoLoader.vue';
  import { computed, onMounted, ref } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const route = useRoute();
  const todos = ref<Todo[]>([]);
  const text = ref<string>("");
  const error = ref<boolean>(false);
  const loading = ref<boolean>(true);

  function addTask () {
    if (text.value !== "") {
      // this.$store.dispatch("addTask", this.text);
      text.value = "";
      // if (this.page !== 1) this.$router.push("/page/1");
    } else {
      error.value = true;
    }
  }

  function clearTitle () {
    text.value = "";
  }

  function sortTask () {
    todos.value.reverse();
  }

  // const computedTodos = computed(() => {
  //   const pageNumber = +this.$route.params.pageNumber;
  //   const tasks = this.$store.getters.tasks(pageNumber - 1);
  //   return tasks;
  // });

  onMounted(()=> {
    console.log('route.params: ', route.params);
  });

  const pageNumber = computed(()=> {
    const page = Number(route.params.pageNumber);
    return page;
  });

  const showPagination = computed(()=> {
    // let taskLength = this.$store.state.tasks.length;
    // if (taskLength > 10) {
    //   return true;
    // }
    return false;
  });

  const prevDisable = computed(() => {
    // if (this.pageNumber <= 1) {
    //   return true;
    // }
    return false;
  });

  const nextDisable = computed(() => {
    // let taskLength = this.$store.state.tasks.length;
    // if (taskLength <= this.pageNumber * 10) {
    //   return true;
    // }
    return false;
  });
</script>

<template>
  <div class="max-w-[500px] w-full mx-auto bg-[#ebecf0] rounded-[5px] mt-[50px] p-[30px_13px_13px]">
    <div class="task-header">
      <div class="task-header__title">
        Задачи
      </div>
      <div class="task-header__options">
        <span>&bull;&bull;&bull;</span>
      </div>
    </div>

    <div class="task-form">
      <div
        class="task-form__text-overflow"
        :class="{'error': error}"
      >
        <textarea
          v-model.trim="text"
          type="text"
          placeholder="Enter a title for this card..."
          class="task-form__text"
          @keyup.enter="addTask"
        />
      </div>

      <div class="task-form__actions">
        <button
          class="task-form__add"
          @click="addTask"
        >
          Add card
        </button>

        <div
          class="task-form__delete"
          @click="clearTitle"
        >
          <span />
        </div>

        <div
          class="task-form__options"
          @click="sortTask"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
            <path
              d="M0 0h24v24H0z"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>

    <TodoLoader v-if="loading" />

    <div
      v-if="todos.length"
      class="task-list"
    >
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :index="index"
        :todo="todo"
      />
    </div>

    <div
      v-else
      class="task-empty"
    >
      У вас пока нет задач
    </div>

    <div
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
    </div>
  </div>
</template>

<style scoped>
</style>
