<template>
  <div class="divider">
    <span class="divider-text">
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  // ** Props **
  defineProps<{
    title: string
  }>()
</script>

<style lang="scss" scoped>
  .divider {
    width: 100%;
    height: 20px;
    border-bottom: 1px solid white;
    text-align: center;
    position: relative;

    &-text {
      color: white;
      padding: 0 15px;
      position: absolute;
      top: 7px;
      left: 42.5%;

      // replace with other divider
      background: rgb(9, 0, 66) !important;
      background: linear-gradient(
        144deg,
        rgba(9, 0, 66, 1) 0%,
        rgba(11, 0, 78, 1) 100%
      ) !important;
    }
  }
</style>
