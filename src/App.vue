<template>
  <!-- TODO: Add loading with xf-cmpt-lib-->
  <!-- <template v-if="loading?.value">
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
    </template> -->

  <!-- <Nav v-if="!hideNav" /> -->

  <router-view />

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

  import { XfSnackbar } from 'xf-cmpt-lib'
  import Nav from './components/nav/Nav.vue'

  // ** Data **
  const configStore = useConfigStore()

  const route = useRoute()

  const { snackbar, loading } = storeToRefs(configStore)

  // ** Computed **
  const hideNav = computed<boolean>(() => !!route.meta?.hideNav)
</script>

<style lang="scss">
  @import 'xf-cmpt-lib/dist/cmpt-lib-ts.css';

  body {
    background: rgb(9, 0, 66);
    background: linear-gradient(
      144deg,
      rgba(9, 0, 66, 1) 0%,
      rgba(11, 0, 78, 1) 100%
    );
    color: white;

    max-width: 450px;
    margin: 10px auto !important;
  }
</style>
