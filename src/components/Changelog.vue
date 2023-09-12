<script setup lang="ts">
import {ChangelogEntry} from "../core/changelog";
import IconButton from "./IconButton.vue";
import { TrashIcon } from '@heroicons/vue/24/solid';

defineProps<{
  changelog: ChangelogEntry[]
}>();

const emit = defineEmits<{
  clear: []
}>();
</script>

<template>
  <div class="changelog">
    <TransitionGroup name="list">
      <div class="entry" v-for="(entry, index) of changelog" :key="index">
        <div class="msg">{{entry.msg}}</div>
        <div class="children">
          <p class="child" v-for="child of entry.children">{{child}}</p>
        </div>
      </div>
    </TransitionGroup>
    <span class="entry" v-if="changelog.length === 0"><i>Nothing here yet...</i></span>
    <IconButton title="Clear logs" class="trash" @click="emit('clear')">
      <TrashIcon />
    </IconButton>
  </div>
</template>

<style>
.changelog {
  background-color: #f9f9f9;
  padding: .6em;

  height: 12em;
  overflow: auto;
  resize: vertical;

  position: relative;
}

.trash {
  position: absolute;
  top: 1em;
  right: 1em;
}

.entry {
  font-size: 0.8em;
  margin-bottom: .1em;
}

.msg {
  color: #4f4f4f;
}

.children {
  margin-left: 1.2em;
}

.child {
  margin: 0;
}

.list-enter-active {
  transition: all 0.125s ease;
}

.list-enter-from {
  opacity: 0;
}
</style>