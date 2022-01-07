<template>
  <div
    class="swipe-actions"
    draggable="true"
    @touchstart="dragStart"
    @touchend="dragEnd"
    @dragstart="dragStart"
    @dragend="dragEnd"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SwipeActions',
    setup(props, context) {
      let startCoordinates: any

      const dragStart = (e: any): void => {
        startCoordinates = {
          x: e.clientX,
          y: e.clientY,
        }
      }

      const dragEnd = (e: any) => {
        const xDiff = Math.abs(
          Math.abs(startCoordinates.x) - Math.abs(e.clientX)
        )

        if (xDiff >= 100) context.emit('delete')
      }

      return {
        dragStart,
        dragEnd,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
