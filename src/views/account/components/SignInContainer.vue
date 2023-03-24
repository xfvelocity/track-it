<template>
  <div class="login xf-flex-center">
    <div class="login-wrapper">
      <div class="text-center mb-8">
        <img class="login-logo" src="/img/icons/logo.svg" alt="" />
        <h1 class="login-title xf-mt-2">
          Track <br />
          IT
        </h1>
      </div>

      <div>
        <sign-up v-if="isSignUp" />
        <log-in v-else />
      </div>

      <other-options :sign-up="isSignUp" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouteLocationNormalized, useRoute } from 'vue-router'

  import LogIn from '../LogIn.vue'
  import OtherOptions from './OtherOptions.vue'
  import SignUp from '../SignUp.vue'

  // ** Data **
  const route: RouteLocationNormalized = useRoute()

  // ** Computed **
  const isSignUp = computed<boolean>(() => route.name === 'Sign up')
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
