<template>
  <div class="login xf-flex-center">
    <div class="login-wrapper">
      <div class="xf-text-center xf-mb-8">
        <img class="login-logo" src="/img/icons/logo.svg" alt="" />
        <h1 class="login-title xf-mt-2">
          Track <br />
          IT
        </h1>
      </div>

      <router-view />

      <other-options />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import OtherOptions from './OtherOptions.vue'
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;

    &-wrapper {
      width: 90%;
    }

    &-logo {
      width: 100px;
      height: 100px;
    }

    &-title {
      text-align: center;
      font-size: 38px;
      letter-spacing: 0.12em;
      line-height: 35px;
      font-weight: 700;
    }
  }
</style>
