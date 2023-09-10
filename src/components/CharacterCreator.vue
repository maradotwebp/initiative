<script setup lang="ts">
import Input from "./Input.vue";
import { ICharacter } from "../core/character.ts";
import Box from "./Box.vue";
import {ref} from "vue";
import IconButton from "./IconButton.vue";
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';

const x = defineProps<{
  character: ICharacter
}>();

const trayOpen = ref(false);

function toggleTray() {
  trayOpen.value = !trayOpen.value;
}
</script>

<template>
  <div class="wrapper">
    <Box class="character">
      <div class="left">
        <slot name="icon" />
        <Input class="name-input" maxlength="20" v-model="character.name" />
      </div>
      <div class="right">
        <div class="hp">
          <Input class="hp-input" type="number" min="0" max="999" placeholder="cur" v-model="character.hp.current" />
          /
          <Input class="hp-input" type="number" min="0" max="999" placeholder="max" v-model="character.hp.max" />
          HP
        </div>
        <IconButton @click="toggleTray">
          <EllipsisVerticalIcon />
        </IconButton>
      </div>
    </Box>
    <Transition>
      <Box v-show="trayOpen" class="actions">
        <slot name="actions" />
      </Box>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.character {
  align-self: stretch;

  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;
  align-items: end;
  background: #f9f9f9;
  padding: 0.5em 0.5em;

  z-index: 2;
}

.name-input {
  align-self: stretch;
}

.actions {
  border-width: 0 2px 2px 2px;
  width: fit-content;
  padding: 0.25em;

  margin: 0 0.6em;
}

.left {
  display: flex;
  gap: .4em;
  align-items: center;
}

.right {
  display: flex;
  gap: 1em;
  align-items: center;
}

.hp {
  font-style: italic;
}

.hp-input {
  width: 5ch;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.125s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-2em);
}

@media screen and (min-width: 720px) {
  .character {
    flex-direction: row;
    align-items: stretch;
  }
}
</style>