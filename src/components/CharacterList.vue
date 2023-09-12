<script setup lang="ts">
import type { CharacterState } from "../core/character.ts";
import Character from "./Character.vue";
import { PlusIcon, TrashIcon, DocumentDuplicateIcon, PlayIcon, StopIcon, BackwardIcon, ForwardIcon } from '@heroicons/vue/20/solid';
import IconButton from "./IconButton.vue";
import {computed, reactive} from "vue";

const props = defineProps<{
  characters: CharacterState[]
}>();

const emit = defineEmits<{
  add: []
  delete: [character: CharacterState]
  copy: [character: CharacterState]
}>();

const sortedCharacters = computed(() => {
  const arr = [...props.characters];
  arr.sort((a, b) => b.initiative - a.initiative);
  return arr;
});

interface TrackerState {
  inFight: boolean;
  characters: {
    cur: CharacterState|undefined
  }
}

const trackerState = reactive<TrackerState>({
  inFight: false,
  characters: {
    cur: undefined
  }
});

function toggleInFight() {
  trackerState.inFight ? stopFight() : startFight();
}

function startFight() {
  // Don't start if there's not enough characters
  if(sortedCharacters.value.length < 2) return;
  if(sortedCharacters.value.every(c => c.hp.current === 0)) return;

  trackerState.inFight = true;
  trackerState.characters = {
    cur: sortedCharacters.value[0]
  };
}

function stopFight() {
  trackerState.inFight = false;
  trackerState.characters = {
    cur: undefined
  }
}

function backward() {
  if(!trackerState.inFight) return;
  if(sortedCharacters.value.every(c => c.hp.current === 0)) return stopFight();

  let prev: CharacterState|undefined;
  do {
    const curIdx = sortedCharacters.value.findIndex(c => c === trackerState.characters.cur);
    prev = sortedCharacters.value[(curIdx - 1 + sortedCharacters.value.length) % sortedCharacters.value.length];
    trackerState.characters = { cur: prev };
  } while(!prev || prev.hp.current === 0);
}

function forward() {
  if(!trackerState.inFight) return;
  if(sortedCharacters.value.every(c => c.hp.current === 0)) return stopFight();

  let next: CharacterState|undefined;
  do {
    const curIdx = sortedCharacters.value.findIndex(c => c === trackerState.characters.cur);
    next = sortedCharacters.value[(curIdx + 1) % sortedCharacters.value.length];
    trackerState.characters = { cur: next };
  } while(!next || next.hp.current === 0);
}
</script>

<template>
  <div>
    <div class="title">
      <div>
        <IconButton title="Previous" :disabled="!trackerState.inFight" @click="backward">
          <BackwardIcon />
        </IconButton>
        <IconButton :title="trackerState.inFight ? 'Stop' : 'Start'" @click="toggleInFight">
          <PlayIcon v-if="!trackerState.inFight" />
          <StopIcon v-else />
        </IconButton>
        <IconButton title="Next" :disabled="!trackerState.inFight" @click="forward">
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
          :key="character"
          :character="character"
          :darkMode="trackerState.characters.cur === character"
        >
          <template #actions>
            <div class="actions">
              <IconButton title="Copy" @click="emit('copy', character)">
                <DocumentDuplicateIcon />
              </IconButton>
              <IconButton title="Delete" @click="emit('delete', character)">
                <TrashIcon />
              </IconButton>
            </div>
          </template>
        </Character>
      </TransitionGroup>
      <div v-if="!characters?.length" class="empty-list-info">No characters yet</div>
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