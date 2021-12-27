<template>
  <v-card
    v-if="snackbar && snackbar.isVisible"
    class="snackbar pa-4 text-center font-weight-medium"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'Snackbar',
    setup() {
      const store = useStore()
      const snackbar = ref<any>(null)

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
    position: absolute;
    bottom: 25px;
    width: 90%;
    margin: 0 auto;
  }
</style>
