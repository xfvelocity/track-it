<template>
  <v-snackbar
    content-class="text-center font-weight-medium text-white"
    v-model="snackbar.isVisible"
    :color="snackbar.color"
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
        () => configStore.snackbar.isVisible,
        (isVisible) => {
          if (isVisible) {
            snackbar.value = configStore.snackbar
          }
        }
      )

      return {
        snackbar,
      }
    },
  })
</script>
