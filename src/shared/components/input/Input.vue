<template>
  <input
    class="input"
    :placeholder="placeholder"
    :class="{ outline: outline }"
    :value="modelValue"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    outline: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
})
export default class Input extends Vue {}
</script>

<style lang="scss">
.input {
  border: none;
  background: none;
  border-radius: 5px;
  padding: 7px 10px;
  color: #919094;
}

.outline {
  border: 1px solid #e5e5e5 !important;
}
</style>
