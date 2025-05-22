import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), eslint(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components')
      },
      {
        find: '@content',
        replacement: path.resolve(__dirname, './src/components/content')
      },
      {
        find: '@base',
        replacement: path.resolve(__dirname, './src/components/base')
      },
      { find: '@views', replacement: path.resolve(__dirname, './src/views') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') }
    ]
  }
});
