/// <reference types="vite/client" />

// Пример объявления для .vue файлов
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Для других типов файлов
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
