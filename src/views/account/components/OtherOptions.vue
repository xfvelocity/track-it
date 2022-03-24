<template>
  <div class="other-options">
    <Divider class="mt-8 mb-12 mx-auto" style="width: 80%" title="or" />

    <div class="d-flex justify-center align-center mb-8">
      <div
        v-for="(method, i) in logInMethods"
        :key="i"
        class="other-options-btn cursor-pointer"
        :class="i > 0 ? 'ml-4' : ''"
        @click="logIn(method.value)"
      >
        <img :src="method.icon" alt="" />
      </div>
    </div>

    <p v-if="signUp" class="other-options-text">
      Already have an account?
      <span class="other-options-text__action" @click="$router.push('login')">
        Sign In
      </span>
    </p>

    <p v-else class="other-options-text">
      No account?
      <span class="other-options-text__action" @click="$router.push('sign-up')">
        Sign Up
      </span>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { signIn } from '@/api/auth'
  import { loginMethods } from '../data/account.data'
  import { LoginMethod } from '../types/account.types'
  import Divider from '../../../components/divider/Divider.vue'

  export default defineComponent({
    name: 'OtherOptions',
    components: {
      Divider,
    },
    props: {
      signUp: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const logInMethods: LoginMethod[] = loginMethods

      const logIn = (type: string): void => {
        signIn(type)
      }

      return {
        logInMethods,
        logIn,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .other-options {
    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;

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

      &__action {
        cursor: pointer;
        color: #7cbdff;
      }
    }
  }
</style>
