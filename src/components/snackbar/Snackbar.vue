<template>
  <v-snackbar
    content-class="text-center font-weight-medium"
    :model-value="true"
    :color="snackbar.color"
    text-color="white"
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

            setTimeout(() => {
              store.commit('setSnackbarVisibility', false)
            }, 5000)
          }
        }
      )

      return {
        snackbar,
      }
    },
  })
</script>
