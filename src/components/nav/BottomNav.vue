<template>
  <div class="bottom-nav ti-max-width xf-center-horizontal xf-px-4 xf-py-4">
    <xf-icon
      class="xf-cursor-pointer"
      src="icons/chevron-left.svg"
      fill="white"
      @click="$emit('back')"
    />
  </div>
</template>

<script lang="ts" setup>
  import { XfIcon } from 'xf-cmpt-lib'
</script>

<style lang="scss" scoped>
  .bottom-nav {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
