<template>
  <v-app theme="dark" app>
    <Nav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Nav from './components/nav/Nav.vue'
</script>

<style lang="scss">
  @import 'assets/styles/main.scss';
  .v-application__wrap {
    margin: 0;
    padding: 10px 20px;
    background: rgb(9, 0, 66) !important;
    background: linear-gradient(
      144deg,
      rgba(9, 0, 66, 1) 0%,
      rgba(11, 0, 78, 1) 100%
    ) !important;
  }

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
</style>
