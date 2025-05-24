import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '@/views/TodoList.vue';
import TodoEdit from '@/views/TodoEdit.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/page/1'
  },
  {
    path: '/page/:pageNumber',
    name: 'todo-list',
    component: TodoList
  },
  {
    path: '/edit/:key',
    name: 'edit',
    component: TodoEdit
  }
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
