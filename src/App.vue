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
    <BottomNav v-if="!hideNav" />
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed } from 'vue'
  import { Store, useStore } from 'vuex'
  import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
  import { Loading } from './store/types/config.types'

  import Nav from './components/nav/Nav.vue'
  import Snackbar from './components/snackbar/Snackbar.vue'
  import BottomNav from './components/bottom-nav/BottomNav.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Nav,
      Snackbar,
      BottomNav,
    },
    setup() {
      const store: Store<any> = useStore()
      const route: RouteLocationNormalizedLoaded = useRoute()

      const loading = computed<Loading>(() => store.getters.getLoading)

      const setStoreInStorage = (): void => {
        store.commit('initialiseStore')
      }

      const hideNav = computed<boolean>(() => !!route.meta?.hideNav)

      onMounted(setStoreInStorage)

      return {
        loading,
        hideNav,
      }
    },
  })
</script>

<style lang="scss">
  @import 'assets/styles/main.scss';

  * {
    box-sizing: border-box;
  }

  body,
  input,
  select,
  button {
    font-family: 'Poppins', sans-serif;
  }

  .v-input {
    .v-input__details {
      display: none;
    }
  }

  body {
    background: rgb(9, 0, 66) !important;
    background: linear-gradient(
      144deg,
      rgba(9, 0, 66, 1) 0%,
      rgba(11, 0, 78, 1) 100%
    ) !important;
  }

  .loading-bar {
    position: sticky;
    top: 10px;
    width: 100%;
  }

  #app {
    height: 100vh;

    .v-application {
      max-width: 450px !important;
      margin: 0 auto;

      &__wrap {
        margin: 0;
        height: 100%;
        overflow-y: auto;
        padding: 10px 20px;
        background: rgb(9, 0, 66) !important;
        background: linear-gradient(
          144deg,
          rgba(9, 0, 66, 1) 0%,
          rgba(11, 0, 78, 1) 100%
        ) !important;
      }
    }

    .v-main {
      padding-bottom: 20px !important;
    }
  }
</style>
