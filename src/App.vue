<template>
  <Nav />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Nav from "./shared/components/nav/Nav.vue";

@Options({
  components: {
    Nav,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "assets/styles/main.scss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 10px 20px;
  background: rgb(9, 0, 66);
  background: linear-gradient(
    144deg,
    rgba(9, 0, 66, 1) 0%,
    rgba(11, 0, 78, 1) 100%
  );
}

body,
input {
  font-family: "Poppins", sans-serif;
}
</style>
