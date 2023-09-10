<script setup lang="ts">
import Input from "./Input.vue";
import { ICharacter } from "../core/character.ts";

const x = defineProps<{
  character: ICharacter
}>();
</script>

<template>
  <div class="character box">
    <Input class="name-input" maxlength="20" v-model="character.name" />
    <div class="hp">
      <Input class="hp-input" type="number" min="0" max="999" placeholder="cur" v-model="character.hp.current" />
      /
      <Input class="hp-input" type="number" min="0" max="999" placeholder="max" v-model="character.hp.max" />
      HP
    </div>
  </div>
</template>

<style scoped>
.character {
  display: flex;
  gap: 1em;
  justify-content: space-between;
}

.box {
  padding: 0.5em 0.5em;
  font-size: 1em;

  border: solid 3px #41403E;
  background: #f4f4f8;

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;
}

.hp {
  font-style: italic;
}

.hp-input {
  width: 5ch;
}
</style>