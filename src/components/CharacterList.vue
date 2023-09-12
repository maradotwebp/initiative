<script setup lang="ts">
import type { ICharacter as ICharacter } from "../core/character.ts";
import Character from "./Character.vue";
import { PlusIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/vue/20/solid';
import IconButton from "./IconButton.vue";
import {computed} from "vue";

const props = defineProps<{
  characters: ICharacter[]
}>();

const emit = defineEmits<{
  add: []
  delete: [character: ICharacter]
  copy: [character: ICharacter]
}>();

const sortedCharacters = computed(() => {
  const arr = [...props.characters];
  arr.sort((a, b) => b.initiative - a.initiative);
  return arr;
});
</script>

<template>
  <div>
    <div class="title">
      <div>---</div>
      <IconButton title="Add" @click="emit('add')">
        <PlusIcon />
      </IconButton>
    </div>

    <hr class="divider" />

    <div class="list">
      <TransitionGroup name="list">
        <Character v-for="character in sortedCharacters" :key="character" :character="character" :bgIconUrl="bgIconUrl">
          <template #actions>
            <div class="actions">
              <IconButton title="Copy" @click="emit('copy', character)">
                <DocumentDuplicateIcon />
              </IconButton>
              <IconButton title="Delete" @click="emit('delete', character)">
                <TrashIcon />
              </IconButton>
            </div>
          </template>
        </Character>
      </TransitionGroup>
      <div v-if="!characters?.length" class="empty-list-info">No characters yet</div>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  gap: 1em;
  align-items: end;
  justify-content: space-between;
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

.empty-list-info {
  font-size: 0.8em;
  font-style: italic;
  margin: auto;
  width: fit-content;
  color: #000000aa;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.125s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-enter-from {
  transform: translateX(-10px);
}

.list-leave-to {
  transform: translateX(10px);
}

.list-leave-active {
  position: absolute;
  width: min(calc(100vw - 1.2em), 60ch);
}
</style>