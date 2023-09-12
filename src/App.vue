<script setup lang="ts">
import {useLocalStorage} from "./core/useLocalStorage.ts";
import {CharacterState} from "./core/character.ts";
import CharacterList from "./components/CharacterList.vue";
import {genId} from "./core/id.ts";
import {ChangelogEntry} from "./core/changelog.ts";
import Changelog from "./components/Changelog.vue";

const characters = useLocalStorage<CharacterState[]>("characters", []);

function addCharacter() {
  characters.value.push({
    id: genId(),
    name: "Character",
    type: "sword",
    initiative: 10,
    hp: { current: 10, max: 10 },
    note: ""
  });
}

function deleteCharacter(character: CharacterState) {
  const idx = characters.value.findIndex(char => char.id === character.id);
  characters.value.splice(idx, 1);
}

function copyCharacter(character: CharacterState) {
  characters.value.push({
    ...character,
    id: genId(),
    hp: {
      ...character.hp
    },
  });
}

const changelog = useLocalStorage<ChangelogEntry[]>("changelog", []);

function addChangelogEntry(entry: ChangelogEntry) {
  changelog.value.push(entry);
}

function clearChangelog() {
  changelog.value = [];
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
    <div>
      <h1>{{title}}</h1>
      <CharacterList
          :characters="characters"
          @add="addCharacter"
          @delete="deleteCharacter"
          @copy="copyCharacter"
          @changelog="addChangelogEntry"
      />
    </div>
    <Changelog :changelog="changelog" @clear="clearChangelog" />
  </div>
</template>

<style scoped>
.main {
  max-width: 60ch;
  margin: auto;
  padding: 1.2em 0.6em;
}

.main > * + * {
  margin-top: 2em;
}

h1 {
  font-size: 1.2em;
}
</style>