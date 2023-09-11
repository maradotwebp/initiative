<script setup lang="ts">
import {Ref, ref} from "vue";
import type { ICharacter as ICharacter } from "../core/character.ts";
import CharacterList from "../components/CharacterCreatorList.vue";
import broadswordUrl from "../assets/broadsword.svg";
import macheteUrl from "../assets/machete.svg";
import {useLocalStorage} from "../core/useLocalStorage.ts";

const heroes = useLocalStorage<ICharacter[]>("heroes", []);
const enemies = useLocalStorage<ICharacter[]>("enemies", []);

function addCharacter(arr: Ref<ICharacter[]>, name: string) {
  arr.value.push({
    name,
    initiative: 10,
    hp: { current: 4, max: 4 }
  });
}

function deleteCharacter(arr: Ref<ICharacter[]>, character: ICharacter) {
  const idx = arr.value.findIndex(h => h === character);
  arr.value.splice(idx, 1);
}

function copyCharacter(arr: Ref<ICharacter[]>, character: ICharacter) {
  arr.value.push({ ...character });
}

const addHero = () => addCharacter(heroes, "Hero");
const addEnemy = () => addCharacter(enemies, "Enemy");
const deleteHero = (char: ICharacter) => deleteCharacter(heroes, char);
const deleteEnemy = (char: ICharacter) => deleteCharacter(enemies, char);
const copyHero = (char: ICharacter) => copyCharacter(heroes, char);
const copyEnemy = (char: ICharacter) => copyCharacter(enemies, char);
</script>

<template>
  <div class="main">
    <CharacterList
        :characters="heroes"
        :bgIconUrl="broadswordUrl"
        @add="addHero"
        @delete="deleteHero"
        @copy="copyHero"
    >
      <template #title>
        <h1>The glorious heroes</h1>
      </template>
    </CharacterList>

    <CharacterList
        :characters="enemies"
        :bgIconUrl="macheteUrl"
        @add="addEnemy"
        @delete="deleteEnemy"
        @copy="copyEnemy"
    >
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

  display: flex;
  flex-direction: column;
  gap: 3.2em;
}

h1 {
  font-size: 1.2em;
  margin: 0;
}
</style>