<script setup lang="ts">
import Input from "./Input.vue";
import { ICharacter } from "../core/character.ts";
import Box from "./Box.vue";

const x = defineProps<{
  character: ICharacter
}>();
</script>

<template>
  <div>
    <Box class="character">
      <Input class="name-input" maxlength="20" v-model="character.name" />
      <div class="hp">
        <Input class="hp-input" type="number" min="0" max="999" placeholder="cur" v-model="character.hp.current" />
        /
        <Input class="hp-input" type="number" min="0" max="999" placeholder="max" v-model="character.hp.max" />
        HP
      </div>
    </Box>
    <Box class="actions">
      <slot name="actions" />
    </Box>
  </div>
</template>

<style scoped>
.character {
  display: flex;
  gap: 1em;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 0.5em 0.5em;
}

.actions {
  border-width: 0 2px 2px 2px;
  width: fit-content;
  padding: 0.25em 0.25em;
}

.hp {
  font-style: italic;
}

.hp-input {
  width: 5ch;
}
</style>