import {onMounted, Ref, ref, watchEffect} from "vue";

/**
 * Returns a reactive property which is additionally saved in localstorage.
 */
export function useLocalStorage<T>(key: string, value: T): Ref<T> {
  const val = ref<T>(value) as Ref<T>;

  onMounted(() => {
    val.value = JSON.parse(localStorage.getItem(key) ?? "");
    watchEffect(() => {
      localStorage.setItem(key, JSON.stringify(val.value));
    });
  });

  return val;
}