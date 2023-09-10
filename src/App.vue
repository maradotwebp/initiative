<script setup lang="ts">
import {ref} from "vue";
import type { ICharacter as ICharacter } from "./core/character.ts";
import CharacterList from "./components/CharacterList.vue";

const heroes = ref<ICharacter[]>([]);
const enemies = ref<ICharacter[]>([]);

function addHero() {
  heroes.value.push({
    name: "Hero",
    hp: { current: 4, max: 4 }
  });
}

function addEnemy() {
  enemies.value.push({
    name: "Enemy",
    hp: { current: 4, max: 4 }
  });
}
</script>

<template>
  <div class="main">
    <p>The glorious heroes</p>

    <CharacterList :characters="heroes" @add="addHero" />

    <p>The despicable enemies</p>

    <CharacterList :characters="enemies" @add="addHero" />
  </div>
</template>

<style scoped>
.main {
  max-width: 60ch;
  margin: auto;
  padding: 1.2em 0.6em;
}
</style>