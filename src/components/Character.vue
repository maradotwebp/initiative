<script setup lang="ts">
import Input from "./Input.vue";
import type { CharacterState } from "../core/character.ts";
import Box from "./Box.vue";
import {computed, ref} from "vue";
import IconButton from "./IconButton.vue";
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  character: CharacterState
  darkMode?: boolean
}>();

import axeUrl from "../assets/axe.svg";
import bowUrl from "../assets/bow.svg";
import clubUrl from "../assets/club.svg";
import daggerUrl from "../assets/dagger.svg";
import macheteUrl from "../assets/machete.svg";
import swordUrl from "../assets/sword.svg";
import wandUrl from "../assets/wand.svg";

const bg: Record<CharacterState['type'], string> = {
  "axe": axeUrl,
  "bow": bowUrl,
  "club": clubUrl,
  "dagger": daggerUrl,
  "machete": macheteUrl,
  "sword": swordUrl,
  "wand": wandUrl
};
const bgImage = computed(() => bg[props.character.type]);
const characterTypes = Object.keys(bg) as CharacterState['type'][];

const trayOpen = ref(!!props.character.note);
const canToggleTray = computed(() => !props.character.note);

function toggleTray() {
  if(canToggleTray.value) {
    trayOpen.value = !trayOpen.value;
  }
}

function refocus(evt: InputEvent) {
  setTimeout(() => {
    (evt.target as HTMLInputElement).focus();
  });
}

function switchType() {
  const idx = characterTypes.findIndex(t => props.character.type === t);
  const nextIdx = (idx + 1) % characterTypes.length;
  props.character.type = characterTypes[nextIdx];
}

const isDead = computed(() => props.character.hp.current === 0);
const isCloseToDeath = computed(() => !isDead.value && props.character.hp.current <= (props.character.hp.max / 5));

const excludedFromInitiative = computed(() => isDead.value);
</script>

<template>
  <div class="wrapper">
    <Box class="character" :class="{ dark: darkMode ?? false }">
      <div class="left">
        <div class="initiative-wrapper">
          <Input class="initiative-input" type="number" min="0" max="99" placeholder="ini" v-model="character.initiative" @input="refocus" />
          <div v-if="excludedFromInitiative" class="point" title="Excluded from initiative"></div>
        </div>
        <Input class="name-input" maxlength="20" v-model="character.name" />
      </div>
      <div class="right">
        <div class="hp">
          <Input class="hp-input" :class="{ warning: isCloseToDeath, alert: isDead }" type="number" min="0" max="999" placeholder="cur" v-model="character.hp.current" />
          /
          <Input class="hp-input" type="number" min="0" max="999" placeholder="max" v-model="character.hp.max" />
          HP
        </div>
        <IconButton :disabled="!canToggleTray" @click="toggleTray">
          <EllipsisVerticalIcon />
        </IconButton>
      </div>
      <img class="bg-icon" :src="bgImage" />
    </Box>
    <Transition>
      <div class="tray" v-show="trayOpen">
        <Box class="tray-item note">
          <Input class="note-input" placeholder="Notes, Status Effects, ..." v-model="character.note" />
        </Box>
        <Box class="tray-item icons">
          <IconButton title="Switch Weapon" @click="switchType">
            <img :src="bgImage" />
          </IconButton>
          <slot name="actions" />
        </Box>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.character {
  align-self: stretch;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;
  align-items: stretch;
  background: #f9f9f9;
  padding: 0.5em 0.5em;

  z-index: 2;

  overflow: hidden;
}

.character.dark {
  background-color: #1e1e1e;
  color: white;
}

.bg-icon {
  position: absolute;
  opacity: 10%;
  height: 10em;
  top: calc(50% - 5em);
  left: calc(50% - 5em);
  z-index: -1;
}

.dark .bg-icon {
  filter: invert();
}

.left {
  display: flex;
  gap: 0.4em;
}

.initiative-wrapper {
  position: relative;
}

.initiative-input {
  width: 3.2ch;
  font-size: 1.3em;
  font-weight: bold;
}

.initiative-wrapper .point {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  top: -4px;
  right: -4px;
  background-color: #fc4c4c;
}

.dark .initiative-wrapper .point {
  background-color: #ad3535;
}

.name-input {
  align-self: stretch;
  max-width: 16ch;
}

.tray {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2em;
}

.tray-item {
  border-width: 0 2px 2px 2px;
  width: fit-content;
  padding: 0.25em;
  margin: 0 0.6em;

  display: flex;
  gap: 0.1em;
}

.tray-item.note {
  flex: 1 1 auto;
}

.tray-item.icons {
  flex: 0 0 auto;
}

.note-input {
  font-size: 0.8em;
  width: 100%;
  font-style: italic;
}

.right {
  align-self: end;

  display: flex;
  gap: 1em;
  align-items: center;
}

.hp {
  font-style: italic;
}

.hp-input {
  width: 5ch;
}

.hp-input.warning {
  background-color: #ffd296;
}

.dark .hp-input.warning {
  background-color: #c59037;
}

.hp-input.alert {
  background-color: #ff9696;
}

.dark .hp-input.alert {
  background-color: #ad3535;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.125s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-2em);
}

@media screen and (min-width: 720px) {
  .character {
    flex-direction: row;
    align-items: stretch;
  }

  .bg-icon {
    height: 6em;
    top: calc(50% - 3em);
    left: calc(50% - 3em);
  }

  .tray {
    gap: 25%;
  }
}
</style>