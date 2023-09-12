<script setup lang="ts">
import type { CharacterState } from "../core/character";
import Character from "./Character.vue";
import { PlusIcon, TrashIcon, DocumentDuplicateIcon, PlayIcon, StopIcon, BackwardIcon, ForwardIcon } from '@heroicons/vue/20/solid';
import IconButton from "./IconButton.vue";
import {computed, ref} from "vue";
import {next, previous, startedFight, stoppedFight, TrackerState} from "../core/tracker.ts";
import {ChangelogEntry, compileChangelogChildren} from "../core/changelog.ts";
import {toRawDeep} from "../core/toRawDeep.ts";

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

const tracker = ref<TrackerState>(stoppedFight());
const charactersBeforeEndOfTurn = ref<CharacterState[]>(structuredClone(toRawDeep(props.characters)));

function toggleInFight() {
  if(tracker.value.inFight) {
    tracker.value = stoppedFight();
  } else {
    tracker.value = startedFight(sortedCharacters.value);
    charactersBeforeEndOfTurn.value = structuredClone(toRawDeep(props.characters));
  }
}

function backward() {
  tracker.value = previous(tracker.value, sortedCharacters.value);
  emit('changelog', { msg: "Went back a turn.", children: [] });
}

function forward() {
  const characterName = tracker.value.currentCharacter?.name;
  tracker.value = next(tracker.value, sortedCharacters.value);
  const before = charactersBeforeEndOfTurn.value;
  const after = props.characters;
  const changelog = compileChangelogChildren(before, after);
  emit('changelog', { msg: `${characterName} ended their turn.`, children: changelog });
  charactersBeforeEndOfTurn.value = structuredClone(toRawDeep(props.characters));
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
        <IconButton title="Next" :disabled="!tracker.inFight" @click="forward">
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
          :darkMode="tracker.currentCharacter === character"
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