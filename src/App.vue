<template>
  <xf-loading-bar v-if="loading" />

  <Nav v-if="!hideNav" />

  <div class="xf-px-6" :class="hideNav ? 'xf-pt-6' : 'xf-pt-2'">
    <router-view />
  </div>

  <xf-snackbar
    v-model="snackbar.isVisible"
    :background-colour="snackbar.color"
    :timeout="2000"
  >
    <div class="xf-text-center xf-fw-600 xf-text-ellipsis">
      {{ snackbar.text }}
    </div>
  </xf-snackbar>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useConfigStore } from '@/stores/config'
  import { storeToRefs } from 'pinia'

  import { XfSnackbar, XfLoadingBar } from 'xf-cmpt-lib'
  import Nav from './components/nav/Nav.vue'

  // ** Data **
  const configStore = useConfigStore()

  const route = useRoute()

  const { snackbar, loading } = storeToRefs(configStore)

  // ** Computed **
  const hideNav = computed<boolean>(() => !!route.meta?.hideNav)
</script>

<style lang="scss">
  @import 'v-calendar/dist/style.css';
  @import 'xf-cmpt-lib/dist/cmpt-lib-ts.css';
  @import '@/assets/styles/index.scss';
</style>
