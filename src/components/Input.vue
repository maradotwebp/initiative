<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
</script>

<template>
  <input v-model="value" />
</template>

<style scoped>
input {
  font: inherit;
  border: 0;
  padding: .2em .6em;
  background: #ececec;

  border-top-left-radius: 15px 255px;
  border-top-right-radius: 225px 15px;
  border-bottom-right-radius: 15px 225px;
  border-bottom-left-radius: 255px 15px;
}

.dark input {
  background: #3d3d3d;
  color: white;
}

input:hover {
  background: #e0e0e0;
}

.dark input:hover {
  background: #656565;
}

input:focus {
  outline: 2px solid dodgerblue;
}
</style>