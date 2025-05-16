import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import path from 'path'

export default defineConfig({
  plugins: [vue(), eslint()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
    ]
  }
});
