<script setup lang="ts">
import {useLocalStorage} from "./core/useLocalStorage.ts";
import {ICharacter} from "./core/character.ts";
import CharacterList from "./components/CharacterList.vue";

const characters = useLocalStorage<ICharacter[]>("characters", []);

function addCharacter() {
  characters.value.push({
    name: "Character",
    type: "sword",
    initiative: 10,
    hp: { current: 4, max: 4 }
  });
}

function deleteCharacter(character: ICharacter) {
  const idx = characters.value.findIndex(char => char === character);
  characters.value.splice(idx, 1);
}

function copyCharacter(character: ICharacter) {
  characters.value.push({ ...character });
}

const titles = [
    "Prepare your axes!",
    "To the battlestations!",
    "Mount the cannons!",
    "Fight for what's right!",
    "Roll initiative!"
]
const title = titles[Math.floor(Math.random() * titles.length)];
</script>

<template>
  <div class="main">
    <h1>{{title}}</h1>
    <CharacterList
      :characters="characters"
      @add="addCharacter"
      @delete="deleteCharacter"
      @copy="copyCharacter"
    />
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
}
</style>