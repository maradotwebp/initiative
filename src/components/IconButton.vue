<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  height: 2em;
  width: 2em;
  color: #333333;
  background-color: inherit;
  border: 0;
  padding: .4em;
  cursor: pointer;
  transition: transform 120ms;
}

button:hover {
  transform: rotateZ(10deg) scale(110%);
  color: black;
}
</style>