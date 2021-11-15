<template>
  <div class="select-container">
    <label v-if="label" class="label" for="select">{{ label }}</label>
    <select
      class="select"
      id="select"
      :class="{ outline: outline }"
      :value="modelValue"
    >
      <option v-for="(option, i) in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Select } from "@/shared/types/globalTypes";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  label: {
    type: String,
    default: "",
  },
  options: {
    type: Array as PropType<Select[]>,
  },
  outline: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.select-container {
  .select {
    border: none;
    background: none;
    border-radius: 0.3rem;
    padding: 10px;
    color: #919094;
  }

  label {
    display: block;
  }
}
</style>
