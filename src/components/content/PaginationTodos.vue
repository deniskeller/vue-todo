<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;}>();

  const emit = defineEmits<{
    (e: 'pageChange', page: number): void;
  }>();

  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  const MAX_VISIBLE_PAGES = 3;

  // кнопки управления смены страниц
  const prevDisabled = computed(() => props.currentPage <= 1);
  const nextDisabled = computed(() => props.currentPage >= totalPages.value);

  // Вычисляем диапазон отображаемых страниц
  const startPage = computed(() => {
    if (totalPages.value <= MAX_VISIBLE_PAGES) return 1;

    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    const start = Math.max(1, props.currentPage - halfVisible);
    const end = Math.min(totalPages.value, start + MAX_VISIBLE_PAGES - 1);

    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      return Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }
    return start;
  });

  const endPage = computed(() => {
    if (totalPages.value <= MAX_VISIBLE_PAGES) return totalPages.value;
    return Math.min(totalPages.value, startPage.value + MAX_VISIBLE_PAGES - 1);
  });

  // Создаем массив страниц для отображения
  const pages = computed(() => {
    return Array.from(
      { length: endPage.value - startPage.value + 1 },
      (_, i) => startPage.value + i
    );
  });

  // изменение страниц
  const handlePageChange = (value: number) => {
    emit("pageChange", value);
  };
</script>

<template>
  <div class="flex items-center mt-[20px]">
    <!-- к первой странице -->
    <button
      v-if="totalPages > 3"
      class="inline-flex items-center justify-center cursor-pointer rounded-[3px] w-[30px] h-[30px] hover:bg-[rgba(9,30,66,0.08)]"
      :class="{ 'pointer-events-none': prevDisabled }"
      title="Первая страница"
      @click="handlePageChange(1)"
    >
      <svg
        class="w-[30px] h-[30px] rotate-180"
        fill="none"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M8.64969 23.8058C8.22984 24.1646 7.59861 24.1151 7.23981 23.6952C6.881 23.2754 6.93049 22.6441 7.35034 22.2853L15.8485 15.0228L7.35034 7.76023C6.93049 7.40142 6.881 6.77019 7.23981 6.35034C7.59861 5.93049 8.22984 5.881 8.64969 6.2398L18.0374 14.2626L18.927 15.0228L18.0374 15.783L8.64969 23.8058ZM12.7806 23.8058C12.3607 24.1646 11.7295 24.1151 11.3707 23.6952C11.0119 23.2754 11.0613 22.6441 11.4812 22.2853L19.9794 15.0228L11.4812 7.76023C11.0613 7.40142 11.0119 6.77019 11.3707 6.35034C11.7295 5.93049 12.3607 5.881 12.7806 6.2398L22.1683 14.2626L23.0579 15.0228L22.1683 15.783L12.7806 23.8058Z"
          fill="black"
          fill-rule="evenodd"
        />
      </svg>
    </button>

    <!-- к предыдущей странице -->
    <button
      class="inline-flex items-center justify-center cursor-pointer rounded-[3px] w-[30px] h-[30px] hover:bg-[rgba(9,30,66,0.08)]"
      :class="{ 'pointer-events-none': prevDisabled }"
      title="Предыдущая страница"
      @click="handlePageChange(currentPage - 1)"
    >
      <svg
        class="w-[30px] h-[30px] rotate-180"
        fill="none"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 23.05L19.39 15.025L10 7"
          stroke="black"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </button>

    <!-- Многоточие, если есть скрытые страницы в начале -->
    <span
      v-if="startPage > 1"
      class="m-[0_10px]"
    >...</span>

    <!-- Номера страниц -->
    <button
      v-for="number in pages"
      :key="number"
      class="m-[0_4px] cursor-pointer"
      :class="{ 'text-[#61bd4f]': currentPage === number }"
      @click="handlePageChange(number)"
    >
      {{ number }}
    </button>

    <!-- Многоточие, если есть скрытые страницы в конце -->
    <span
      v-if="endPage < totalPages"
      class="m-[0_10px]"
    >...</span>

    <!-- к следующей странице -->
    <button
      class="inline-flex items-center justify-center cursor-pointer rounded-[3px] w-[30px] h-[30px] hover:bg-[rgba(9,30,66,0.08)]"
      :class="{ 'pointer-events-none': nextDisabled }"
      title="Следущая страница"
      @click="handlePageChange(currentPage + 1)"
    >
      <svg
        class="w-[30px] h-[30px]"
        fill="none"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 23.05L19.39 15.025L10 7"
          stroke="black"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </button>

    <!-- к последней странице -->
    <button
      v-if="totalPages > 3"
      class="inline-flex items-center justify-center cursor-pointer rounded-[3px] w-[30px] h-[30px] hover:bg-[rgba(9,30,66,0.08)]"
      :class="{ 'pointer-events-none': nextDisabled }"
      title="Последняя страница"
      @click="handlePageChange(totalPages)"
    >
      <svg
        class="w-[30px] h-[30px]"
        fill="none"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M8.64969 23.8058C8.22984 24.1646 7.59861 24.1151 7.23981 23.6952C6.881 23.2754 6.93049 22.6441 7.35034 22.2853L15.8485 15.0228L7.35034 7.76023C6.93049 7.40142 6.881 6.77019 7.23981 6.35034C7.59861 5.93049 8.22984 5.881 8.64969 6.2398L18.0374 14.2626L18.927 15.0228L18.0374 15.783L8.64969 23.8058ZM12.7806 23.8058C12.3607 24.1646 11.7295 24.1151 11.3707 23.6952C11.0119 23.2754 11.0613 22.6441 11.4812 22.2853L19.9794 15.0228L11.4812 7.76023C11.0613 7.40142 11.0119 6.77019 11.3707 6.35034C11.7295 5.93049 12.3607 5.881 12.7806 6.2398L22.1683 14.2626L23.0579 15.0228L22.1683 15.783L12.7806 23.8058Z"
          fill="black"
          fill-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>
