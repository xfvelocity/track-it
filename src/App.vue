<template>
  <v-app theme="dark" app>
    <v-progress-linear
      v-if="isLoading"
      color="green"
      height="6"
      indeterminate
    ></v-progress-linear>
    <div class="app-content">
      <Nav />
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import Nav from './components/nav/Nav.vue'

  const store = useStore()
  const isLoading = ref<boolean>(false)

  const setStoreInStorage = () => {
    store.commit('initialiseStore')
  }

  watch(
    () => store.state.config.loading,
    (loading) => {
      isLoading.value = loading
    }
  )
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
    background: rgb(119, 119, 119) !important;
  }

  .v-application {
    max-width: 450px !important;
    margin: 0 auto;

    .app-content {
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
</style>
