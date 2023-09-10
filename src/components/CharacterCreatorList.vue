<script setup lang="ts">
import type { ICharacter as ICharacter } from "../core/character.ts";
import Character from "./CharacterCreator.vue";
import { PlusIcon, TrashIcon } from '@heroicons/vue/20/solid';
import IconButton from "./IconButton.vue";

defineProps<{
  characters?: ICharacter[]
}>();

const emit = defineEmits<{
  add: []
  delete: [character: ICharacter]
}>();
</script>

<template>
  <div>
    <div class="title">
      <slot name="title" />
      <div>
        <IconButton title="Add" @click="emit('add')">
          <PlusIcon />
        </IconButton>
      </div>
    </div>

    <hr class="divider" />

    <div class="list">
      <TransitionGroup name="list">
        <Character v-for="character in characters" :key="character" :character="character">
          <template #actions>
            <div class="actions">
              <IconButton title="Delete" @click="emit('delete', character)">
                <TrashIcon />
              </IconButton>
            </div>
          </template>
        </Character>
      </TransitionGroup>
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

.actions {
  display: flex;
  gap: 0.2em;
}
</style>