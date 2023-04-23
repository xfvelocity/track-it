<template>
  <div class="bottom-nav xf-px-4 xf-py-4">
    <xf-icon src="icons/chevron-left.svg" fill="white" @click="$emit('back')" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { XfIcon } from 'xf-cmpt-lib'

  export default defineComponent({
    name: 'BottomNav',
    components: {
      XfIcon,
    },
  })
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
