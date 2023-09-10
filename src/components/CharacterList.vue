<script setup lang="ts">
import type { ICharacter as ICharacter } from "../core/character.ts";
import Character from "./Character.vue";
import { PlusIcon } from '@heroicons/vue/20/solid';

defineProps<{
  characters?: ICharacter[]
}>();

const emit = defineEmits<{
  add: []
}>();
</script>

<template>
  <div>
    <div class="icons">
      <button class="icon-button" @click="emit('add')">
        <PlusIcon />
      </button>
    </div>

    <hr class="divider" />

    <div class="list">
      <Character v-for="character in characters" :character="character" />
    </div>
  </div>
</template>

<style scoped>
.icons {
  display: flex;
  justify-content: end;
}

.icon-button {
  height: 2em;
  width: 2em;
  color: #333333;
  background-color: inherit;
  border: 0;
  padding: .4em;
  cursor: pointer;
  transition: transform 120ms;
}

.icon-button:hover {
  transform: rotateZ(10deg) scale(110%);
}

.icon-button:hover {
  color: black;
}

.divider {
  margin: 0;
  border: 1px solid #cccccc;
}

.list {
  padding: 1.4em 0;
}

.list > * + * {
  margin-top: .8em;
}
</style>