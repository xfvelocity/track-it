<template>
  <div class="other-options">
    <divider
      class="xf-mt-8 xf-mb-12 xf-mx-auto"
      style="width: 90%"
      title="or"
    />

    <div class="xf-flex-center xf-mb-8">
      <div
        v-for="(method, i) in loginMethods"
        :key="i"
        class="other-options-btn xf-flex-center xf-cursor-pointer"
        :class="[{ 'xf-ml-4': i > 0 }]"
        @click="logIn(method)"
      >
        <img :src="method.icon" alt="" />
      </div>
    </div>

    <p v-if="route.name === 'Sign up'" class="other-options-text">
      Already have an account?
      <span
        class="xf-text-center xf-text-colour-blue"
        @click="router.push('login')"
      >
        Sign In
      </span>
    </p>

    <p v-else class="other-options-text">
      No account?
      <span
        class="xf-text-center xf-text-colour-blue xf-cursor-pointer"
        @click="router.push('sign-up')"
      >
        Sign Up
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { signIn } from '@/api/auth'
  import { useRoute, useRouter } from 'vue-router'
  import { LoginMethod } from '@/views/account/types/account.types'

  import Divider from '@/components/divider/Divider.vue'

  // ** Base **
  defineProps<{
    signUp?: boolean
  }>()

  // ** Data **
  const route = useRoute()
  const router = useRouter()

  const loginMethods: LoginMethod[] = [
    {
      icon: '/img/icons/google.svg',
      value: 'google',
    },
    {
      icon: '/img/icons/facebook.svg',
      value: 'facebook',
    },
    // {
    //   icon: '/img/icons/apple.svg',
    //   value: 'apple',
    // },
  ]

  // ** Methods **
  const logIn = (method: LoginMethod): void => {
    signIn(method.value)
  }
</script>

<style lang="scss" scoped>
  .other-options {
    &-btn {
      height: 55px;
      width: 55px;
      border-radius: 50%;
      border: 1px solid rgb(210, 210, 210);
      background: white;

      img {
        height: 30px;
        width: 30px;
      }
    }

    &-text {
      text-align: center;

      p {
        margin-bottom: 0;
        font-size: 14px;
      }
    }
  }
</style>
