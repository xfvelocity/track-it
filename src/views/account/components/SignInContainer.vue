<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="text-center mb-8">
        <img class="login-logo" src="/img/icons/logo.svg" alt="" />
        <h1 class="login-title mt-2">
          Track <br />
          IT
        </h1>
      </div>

      <div>
        <SignUp v-if="isSignUp" />
        <LogIn v-else />
      </div>

      <OtherOptions :sign-up="isSignUp" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { RouteLocationNormalized, useRoute } from 'vue-router'

  import LogIn from './LogIn.vue'
  import OtherOptions from './OtherOptions.vue'
  import SignUp from './SignUp.vue'

  export default defineComponent({
    name: 'SignInContainer',
    components: {
      LogIn,
      OtherOptions,
      SignUp,
    },
    setup() {
      const route: RouteLocationNormalized = useRoute()
      const isSignUp = computed<boolean>(() => route.name === 'Sign up')

      return {
        isSignUp,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
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
