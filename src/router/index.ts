import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '@/views/TodoList.vue';

const routes = [{
    path: '/',
    name: 'main',
    redirect: '/page/1'
  },
  {
    path: '/page/:pageNumber',
    name: 'TaskList',
    component: TodoList
  },
  // {
  //   path: '/edit/:key',
  //   name: 'TaskEdit',
  //   component: () => import('../views/TaskEdit.vue')
  // },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
