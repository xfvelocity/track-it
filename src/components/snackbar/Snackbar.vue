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
  import { defineComponent, watch, ref } from 'vue'
  import { Snackbar } from './types/Snackbar.types'
  import { Store, useStore } from 'vuex'

  export default defineComponent({
    name: 'Snackbar',
    setup() {
      const store: Store<any> = useStore()
      const snackbar = ref<Snackbar>(store.state.config.snackbar)

      watch(
        () => store.state.config.snackbar.isVisible,
        (isVisible) => {
          if (isVisible) {
            snackbar.value = store.state.config.snackbar
          }
        }
      )

      return {
        snackbar,
      }
    },
  })
</script>
