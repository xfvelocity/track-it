<template>
  <nav class="nav d-flex justify-space-between mt-4 mb-6">
    <span class="nav__title d-flex align-center" @click="$router.push('/')">
      <img src="/img/icons/logo.svg" />
      <h1>Track IT</h1>
    </span>
    <span class="nav__user d-flex align-center">
      <p v-if="showUsername">{{ loggedInUser.name }}</p>
      <img :src="loggedInUser.avatar" alt="" />
    </span>
  </nav>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { LoggedInUser } from './types/Nav.types'

  export default defineComponent({
    name: 'Nav',
    setup() {
      const showUsername = ref<boolean>(false)
      const loggedInUser = ref<LoggedInUser>({
        name: 'Alex Long',
        avatar: '/img/icons/avatar.png',
      })

      return {
        showUsername,
        loggedInUser,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .nav {
    &__title {
      cursor: pointer;

      h1 {
        margin-left: 15px;
        letter-spacing: 1.5px;
        font-weight: 500;
      }

      img {
        width: 50px;
      }
    }

    &__user {
      cursor: pointer;

      p {
        margin-right: 10px;
      }

      img {
        max-width: 40px;
        border-radius: 50%;
      }
    }
  }
</style>
