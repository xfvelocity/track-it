<template>
  <div class="dashboard">
    <Nav />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Nav from "@/shared/components/Nav.vue";

@Options({
  components: {
    Nav,
  },
})
export default class Dashboard extends Vue {}
</script>
