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
    <div class="icons">
      <IconButton title="Add" @click="emit('add')">
        <PlusIcon />
      </IconButton>
    </div>

    <hr class="divider" />

    <div class="list">
      <Character v-for="character in characters" :character="character">
        <template #actions>
          <IconButton title="Delete" @click="emit('delete', character)">
            <TrashIcon />
          </IconButton>
        </template>
      </Character>
    </div>
  </div>
</template>

<style scoped>
.icons {
  display: flex;
  justify-content: end;
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