<template>
  <!-- TODO: UPDATE WITH XF-CMPT-LIB SNACKBAR-->
  <v-snackbar
    content-class="text-center font-weight-medium text-white text-ellipsis"
    v-model="snackbar.isVisible"
    :color="snackbar.color"
    timeout="2000"
    class="snackbar"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/stores/config'
  import { storeToRefs } from 'pinia'

  // ** Data **
  const configStore = useConfigStore()

  const { snackbar } = storeToRefs(configStore)
</script>

<style lang="scss">
  .snackbar {
    .v-overlay__content {
      bottom: 20px !important;
    }
  }
</style>
