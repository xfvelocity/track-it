<template>
  <!-- TODO: FIX -->
  <div class="swipe-actions">
    <div
      class="swipe-actions__item"
      ref="itemRef"
      @mouseup="mouseUp"
      @mousedown="mouseDown"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'SwipeActions',
    setup(props, context) {
      // ** Data **
      let offsetX: number = 0
      const itemRef = ref<HTMLElement | null>(null)

      // ** Methods **
      const mouseDown = (e: MouseEvent): void => {
        if (!itemRef.value) return
        offsetX = e.clientX - itemRef.value.offsetLeft
        window.addEventListener('mousemove', move, true)
      }

      const mouseUp = (): void => {
        window.removeEventListener('mousemove', move, true)

        if (!itemRef.value) return

        if (parseInt(itemRef.value.style.left.split('px')[0]) < -100) {
          context.emit('delete')
        }

        itemRef.value.style.left = '0'
        itemRef.value.style.top = '0'
      }

      const move = (e: MouseEvent): void => {
        if (itemRef.value) {
          itemRef.value.style.left = `${e.clientX - offsetX}px`
        }
      }

      return {
        itemRef,
        mouseDown,
        mouseUp,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .swipe-actions {
    position: relative;

    &__item {
      position: absolute;
      width: 100%;
    }
  }
</style>
