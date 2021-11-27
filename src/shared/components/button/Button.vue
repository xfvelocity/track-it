<template>
  <button
    class="button"
    :style="`color: ${textColour}; background: ${backgroundColour}`"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  textColour: {
    type: String,
    default: "white",
  },
  backgroundColour: {
    type: String,
    default: "#008EF5",
  },
});
</script>

<style lang="scss" scoped>
.button {
  padding: 3px;
  background: none;
  border: 0;
}
</style>
