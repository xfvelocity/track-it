<template>
  <select class="select" :class="{ outline: outline }">
    <option v-for="(option, i) in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Select } from "@/shared/types/globalTypes";

const props = defineProps({
  options: {
    type: Array as PropType<Select[]>,
  },
  outline: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
.select {
  border: none;
  background: none;
  border-radius: 5px;
  padding: 7px 10px;
  color: #919094;

  option {
    border-radius: 0;
  }
}

.outline {
  border: 1px solid #e5e5e5 !important;
  background: none !important;
}
</style>
