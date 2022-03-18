<template>
  <v-app theme="dark" app>
    <div class="loading-bar">
      <v-progress-linear
        v-if="isLoading"
        color="green"
        height="8"
        indeterminate
      ></v-progress-linear>
    </div>
    <Nav />
    <v-main>
      <router-view />
    </v-main>
    <BottomNav />
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, onMounted } from 'vue'
  import { Store, useStore } from 'vuex'
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
      const isLoading = ref<boolean>(false)

      const setStoreInStorage = (): void => {
        store.commit('initialiseStore')
      }

      onMounted(setStoreInStorage)

      watch(
        () => store.state.config.loading,
        (loading) => {
          isLoading.value = loading
        }
      )

      return {
        isLoading,
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
