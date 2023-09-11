import {onMounted, Ref, ref, watchEffect} from "vue";

/**
 * Returns a reactive property which is additionally saved in localstorage.
 */
export function useLocalStorage<T>(key: string, value: T): Ref<T> {
  const val = ref<T>(value) as Ref<T>;

  onMounted(() => {
    const stored = localStorage.getItem(key);
    val.value = stored ? JSON.parse(stored) : value;
    watchEffect(() => {
      localStorage.setItem(key, JSON.stringify(val.value));
    });
  });

  return val;
}