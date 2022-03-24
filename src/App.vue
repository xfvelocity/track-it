<template>
  <v-app theme="dark" app>
    <div class="loading-bar">
      <v-progress-linear
        v-if="isLoading"
        color="green"
        height="8"
        indeterminate
      />
    </div>
    <Nav v-if="!hideNav" />
    <v-main>
      <router-view />
    </v-main>
    <BottomNav v-if="!hideNav" />
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, onMounted, computed } from 'vue'
  import { Store, useStore } from 'vuex'
  import Nav from './components/nav/Nav.vue'
  import Snackbar from './components/snackbar/Snackbar.vue'
  import BottomNav from './components/bottom-nav/BottomNav.vue'
  import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

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
      const isLoading = ref<boolean>(false)

      const setStoreInStorage = (): void => {
        store.commit('initialiseStore')
      }

      const hideNav = computed<boolean>(
        () => route.name === 'Login' || route.name === 'Sign up'
      )

      onMounted(setStoreInStorage)

      watch(
        () => store.state.config.loading,
        (loading) => {
          isLoading.value = loading
        }
      )

      return {
        isLoading,
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
        padding: 10px 20px;
        background: rgb(9, 0, 66) !important;
        background: linear-gradient(
          144deg,
          rgba(9, 0, 66, 1) 0%,
          rgba(11, 0, 78, 1) 100%
        ) !important;
      }
    }
  }
</style>
