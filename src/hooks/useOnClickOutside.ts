import { onMounted, onUnmounted, Ref } from 'vue';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement>(
  elementRef: Ref<T | null>,
  handler: (event: Event) => void
) => {
  const listener = (event: Event) => {
    const el = elementRef.value;

    if (event instanceof MouseEvent) {
      const x = event?.offsetX || 0;
      const width = window?.innerWidth - 18;

      if (x >= width) {
        return;
      }
    }

    if (!el || el.contains((event?.target as Node) || null)) {
      return;
    }

    handler(event);
  };

  onMounted(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  });
};

export default useOnClickOutside;
