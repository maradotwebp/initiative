<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  height: 2em;
  width: 2em;
  background-color: inherit;
  border: 0;
  padding: .4em;
  transition: transform 120ms;
}

button:enabled {
  cursor: pointer;
  color: #333333;
}

.dark button:enabled {
  color: #cccccc;
}

button:disabled {
  color: #888888;
}

button:hover:enabled {
  transform: rotateZ(-3deg) scale(120%);
  color: black;
}

.dark button:hover:enabled {
  color: white;
}
</style>