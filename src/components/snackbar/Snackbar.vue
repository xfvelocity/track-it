<template>
  <v-snackbar
    content-class=" text-center font-weight-medium text-white text-ellipsis"
    v-model="snackbar.isVisible"
    :color="snackbar.color"
    timeout="2000"
    class="snackbar"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts">
  import { useConfigStore } from '@/stores/config'
  import { defineComponent, watch, ref } from 'vue'
  import { Snackbar } from './types/Snackbar.types'

  export default defineComponent({
    name: 'Snackbar',
    setup() {
      const configStore = useConfigStore()

      const snackbar = ref<Snackbar>(configStore.snackbar)

      watch(
        () => configStore.snackbar,
        (value) => (snackbar.value = value)
      )

      return {
        snackbar,
      }
    },
  })
</script>

<style lang="scss">
  .snackbar {
    .v-overlay__content {
      bottom: 20px !important;
    }
  }
</style>
