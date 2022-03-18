<template>
  <v-card
    v-if="snackbar && snackbar.isVisible"
    class="snackbar py-2 text-center text-white font-weight-medium"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from 'vue'
  import { Snackbar } from './types/Snackbar.types'
  import { Store, useStore } from 'vuex'

  export default defineComponent({
    name: 'Snackbar',
    setup() {
      const store: Store<any> = useStore()
      const snackbar = ref<Snackbar | null>(null)

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

<style lang="scss" scoped>
  .snackbar {
    position: sticky;
    bottom: 30px;
    width: 100%;
  }
</style>
