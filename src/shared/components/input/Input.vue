<template>
  <input
    class="input"
    :placeholder="placeholder"
    :class="{ outline: outline }"
    :value="modelValue"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  outline: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<style lang="scss">
.input {
  border: none;
  background: none;
  border-radius: 0.3rem;
  padding: 7px 10px;
  color: #919094;
}

.outline {
  border: 1px solid #e5e5e5 !important;
}
</style>
