<script setup lang="ts">
import type { CharacterState } from "../core/character";
import Character from "./Character.vue";
import { PlusIcon, TrashIcon, DocumentDuplicateIcon, PlayIcon, StopIcon, BackwardIcon, ForwardIcon } from '@heroicons/vue/20/solid';
import IconButton from "./IconButton.vue";
import {computed} from "vue";
import {next, previous, startedFight, stoppedFight, TrackerState} from "../core/tracker.ts";
import {ChangelogEntry, compileChangelogChildren} from "../core/changelog.ts";
import {toRawDeep} from "../core/toRawDeep.ts";
import {useLocalStorage} from "../core/useLocalStorage.ts";

const props = defineProps<{
  characters: CharacterState[]
}>();

const emit = defineEmits<{
  add: []
  delete: [character: CharacterState]
  copy: [character: CharacterState]
  changelog: [msg: ChangelogEntry]
}>();

const sortedCharacters = computed(() => {
  const arr = [...props.characters];
  arr.sort((a, b) => b.initiative - a.initiative);
  return arr;
});

const tracker = useLocalStorage<TrackerState>("tracker", stoppedFight());
const charactersBeforeEndOfTurn = useLocalStorage<CharacterState[]>("charactersBefore", structuredClone(toRawDeep(props.characters)));

function toggleInFight() {
  if(tracker.value.inFight) {
    tracker.value = stoppedFight();
    emit('changelog', { msg: "All done! Stopped the fight.", children: [] });
  } else {
    tracker.value = startedFight(sortedCharacters.value);
    charactersBeforeEndOfTurn.value = structuredClone(toRawDeep(props.characters));
    if(tracker.value.inFight) {
      emit('changelog', { msg: "Onwards to victory! Started the fight.", children: [] });
    }
  }
}

function backward() {
  tracker.value = previous(tracker.value, sortedCharacters.value);
  if(tracker.value.inFight) {
    emit('changelog', { msg: "Went back a turn.", children: [] });
  } else {
    emit('changelog', { msg: "All done! Stopped the fight.", children: [] });
  }
}

function forward() {
  const characterName = tracker.value.currentCharacter?.name;
  tracker.value = next(tracker.value, sortedCharacters.value);
  if(tracker.value.inFight) {
    const before = charactersBeforeEndOfTurn.value;
    const after = props.characters;
    const changelog = compileChangelogChildren(before, after);
    emit('changelog', { msg: `${characterName} ended their turn.`, children: changelog });
    charactersBeforeEndOfTurn.value = structuredClone(toRawDeep(props.characters));
  } else {
    emit('changelog', { msg: "All done! Stopped the fight.", children: [] });
  }
}

function deleteCharacter(character: CharacterState) {
  // If the character to delete is the current character, forward
  if(tracker.value.currentCharacter?.id === character.id) {
    forward();
  }
  emit('delete', character);
}
</script>

<template>
  <div>
    <div class="title">
      <div>
        <IconButton title="Previous" :disabled="!tracker.inFight" @click="backward">
          <BackwardIcon />
        </IconButton>
        <IconButton :title="tracker.inFight ? 'Stop' : 'Start'" @click="toggleInFight">
          <PlayIcon v-if="!tracker.inFight" />
          <StopIcon v-else />
        </IconButton>
        <IconButton title="Next / End turn" :disabled="!tracker.inFight" @click="forward">
          <ForwardIcon />
        </IconButton>
      </div>
      <IconButton title="Add" @click="emit('add')">
        <PlusIcon />
      </IconButton>
    </div>

    <hr class="divider" />

    <div class="list">
      <TransitionGroup name="list">
        <Character
          v-for="character in sortedCharacters"
          :key="character.id"
          :character="character"
          :darkMode="tracker.currentCharacter?.id === character.id"
        >
          <template #actions>
            <div class="tray-item">
              <IconButton title="Copy" @click="emit('copy', character)">
                <DocumentDuplicateIcon />
              </IconButton>
              <IconButton title="Delete" @click="deleteCharacter(character)">
                <TrashIcon />
              </IconButton>
            </div>
          </template>
        </Character>
      </TransitionGroup>
      <div v-if="!characters?.length" class="empty-list-info">
        No characters yet. Click the plus button to add one!
      </div>
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

.empty-list-info {
  font-size: 0.8em;
  font-style: italic;
  margin: auto;
  width: fit-content;
  color: #000000aa;
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
</style>