<script setup lang="ts">
import {ChangelogEntry} from "../core/changelog";
import IconButton from "./IconButton.vue";
import { TrashIcon } from '@heroicons/vue/24/solid';
import {computed} from "vue";

const props = defineProps<{
  changelog: ChangelogEntry[]
}>();

const emit = defineEmits<{
  clear: []
}>();

const reversedChangelog = computed(() => {
  const arr = [...props.changelog];
  arr.reverse();
  return arr;
});
</script>

<template>
  <div class="changelog">
    <div ref="scroll" class="scroll">
      <TransitionGroup name="list">
        <div class="entry" v-for="(entry, index) of reversedChangelog" :key="index">
          <div class="msg">{{entry.msg}}</div>
          <div class="children">
            <p class="child" v-for="child of entry.children">{{child}}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <IconButton title="Clear logs" class="trash" @click="emit('clear')">
      <TrashIcon />
    </IconButton>
  </div>
</template>

<style>
.changelog {
  background-color: #f9f9f9;

  position: relative;
}

.scroll {
  padding: .6em;
  overflow-y: scroll;
  height: 12em;
  resize: vertical;

  display: flex;
  flex-direction: column-reverse;
}

.trash {
  position: absolute;
  top: 1em;
  right: 2em;
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