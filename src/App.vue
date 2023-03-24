<template>
  <v-app theme="dark" app>
    <template v-if="loading?.value">
      <v-overlay
        v-if="loading.type === 'fullpage'"
        class="d-flex justify-center align-center"
        v-model="loading.value"
      >
        <v-progress-circular color="white" indeterminate size="64" />
      </v-overlay>
      <v-progress-linear
        v-else
        color="blue-darken-2"
        height="10"
        indeterminate
      />
    </template>

    <Nav v-if="!hideNav" />

    <v-main>
      <router-view />
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
  import { Loading } from '@/stores/types/config.types'
  import { useConfigStore } from '@/stores/config'

  import Nav from './components/nav/Nav.vue'
  import Snackbar from './components/snackbar/Snackbar.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Nav,
      Snackbar,
    },
    setup() {
      // ** Data **
      const configStore = useConfigStore()
      const route: RouteLocationNormalizedLoaded = useRoute()

      // ** Computed **
      const loading = computed<Loading>(() => configStore.loading)

      const hideNav = computed<boolean>(() => !!route.meta?.hideNav)

      return {
        loading,
        hideNav,
      }
    },
  })
</script>

<style lang="scss">
  @import 'xf-cmpt-lib/dist/cmpt-lib-ts.css';
  @import 'assets/styles/main.scss';
</style>
