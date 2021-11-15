<template>
  <span class="input-container">
    <label v-if="label" class="label" for="input">{{ label }}</label>
    <input
      class="input"
      id="input"
      :placeholder="placeholder"
      :class="{ outline: outline }"
      :value.number="modelValue"
    />
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  outline: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "",
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

<style lang="scss" scoped>
.input-container {
  display: inline-block;

  .input {
    border: none;
    background: none;
    border-radius: 2px;
    padding: 3px 10px;
    color: #919094;
    width: 60px;
  }

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
}
</style>
