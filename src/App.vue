<script setup lang="ts">
import {Ref, ref} from "vue";
import type { ICharacter as ICharacter } from "./core/character.ts";
import CharacterList from "./components/CharacterCreatorList.vue";

const heroes = ref<ICharacter[]>([]);
const enemies = ref<ICharacter[]>([]);

function addCharacter(arr: Ref<ICharacter[]>, name: string) {
  arr.value.push({
    name,
    hp: { current: 4, max: 4 }
  });
}

function deleteCharacter(arr: Ref<ICharacter[]>, character: ICharacter) {
  const idx = arr.value.findIndex(h => h === character);
  arr.value.splice(idx, 1);
}

const addHero = () => addCharacter(heroes, "Hero");
const addEnemy = () => addCharacter(enemies, "Enemy");
const deleteHero = (char: ICharacter) => deleteCharacter(heroes, char);
const deleteEnemy = (char: ICharacter) => deleteCharacter(enemies, char);
</script>

<template>
  <div class="main">
    <CharacterList :characters="heroes" @add="addHero" @delete="deleteHero">
      <template #title>
        <h1>The glorious heroes</h1>
      </template>
    </CharacterList>

    <CharacterList :characters="enemies" @add="addEnemy" @delete="deleteEnemy">
      <template #title>
        <h1>The despicable enemies</h1>
      </template>
    </CharacterList>
  </div>
</template>

<style scoped>
.main {
  max-width: 60ch;
  margin: auto;
  padding: 1.2em 0.6em;
}

h1 {
  font-size: 1.2em;
  margin: 0;
}
</style>