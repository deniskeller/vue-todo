<script setup lang="ts">
  import useOnClickOutside from '@/hooks/useOnClickOutside';
  import type { SelectItem } from '@/types';
  import { ref } from 'vue';

  const props = defineProps<{
    className?: string;
    initialValue: SelectItem;
    options: SelectItem[];
  }>();

  const emit = defineEmits<{
    (e: 'change', value: SelectItem): void;
  }>();

  const isOpen = ref(false);
  const selectedOption = ref<SelectItem>(props.initialValue);
  const selectContainerRef = ref<HTMLElement | null>(null);

  useOnClickOutside(selectContainerRef, () => {
    isOpen.value = false;
  });

  const toggling = () => {
    isOpen.value = !isOpen.value;
  };

  const onOptionClicked = (value: SelectItem) => {
    selectedOption.value = value;
    isOpen.value = false;
    emit("change", value);
  };
</script>

<template>
  <div
    ref="selectContainerRef"
    class="relative"
    :class="className"
  >
    <div
      class="group relative cursor-pointer flex items-center leading-none text-base font-inherit w-full h-[38px] border-b-2 border-[#6b778c] transition-all duration-[500ms] ease-in-out hover:border-black"
      :class="{ '!border-black active-parent': isOpen }"
      @click="toggling"
    >
      <p
        class="overflow-hidden whitespace-nowrap text-ellipsis text-[#6b778c] group-hover:text-black transition-[all] duration-[500ms] ease-in-out"
        :class="{ 'text-black': isOpen }"
      >
        {{ selectedOption.label }}
      </p>

      <svg
        class="w-[20px] h-[20px] ml-2 transition-[all] duration-[500ms] ease-in-out"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="group-hover:stroke-black transition-[all] duration-[500ms] ease-in-out"
          :class="{ 'stroke-black': isOpen }"
          d="M5 8L10 12L15 8"
          stroke="#6b778c"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </div>

    <ul
      class="absolute right-0 top-[40px] z-[1000] w-auto max-w-[280px] bg-black/60 shadow-[1px_2px_10px_rgba(0,0,0,0.35)] rounded-[3px] max-h-[200px] overflow-y-auto transition-all duration-200 ease-in-out transform"
      :class="{
        'pointer-events-auto opacity-100': isOpen,
        'pointer-events-none opacity-0': !isOpen
      }"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        class="cursor-pointer h-[40px] list-none flex items-center px-[16px] text-[#fff] hover:bg-black/40"
        @click="onOptionClicked(option)"
      >
        <span class="leading-none text-base font-normal font-inherit">
          {{ option.label }}
        </span>
      </li>
    </ul>
  </div>
</template>
