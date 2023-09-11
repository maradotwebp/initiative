<script setup lang="ts">
import IndexPage from "./pages/Index.vue";
import BattlePage from "./pages/Battle.vue";
import {computed} from "vue";

const routes = {
  "/": IndexPage,
  "/battle": BattlePage
}

const location = window.location.pathname;
const routeComponent = computed(() => location in routes ? routes[location as keyof typeof routes] : IndexPage)
</script>

<template>
  <component :is="routeComponent"></component>
</template>