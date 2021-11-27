<template>
  <nav class="nav d-flex justify-space-between">
    <span class="nav__title d-flex align-center" @click="$router.push('/')">
      <img src="/src/assets/logo.svg" />
      <h1>Track IT</h1>
    </span>
    <span class="nav__user d-flex align-center">
      <p v-if="showUsername">{{ loggedInUser.name }}</p>
      <img src="/src/assets/avatar.png" alt="" />
    </span>
  </nav>
</template>

<script setup lang="ts">
  const showUsername: boolean = false
  const loggedInUser: { name: string; avatar: string } = {
    name: 'Alex Long',
    avatar: '',
  }
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
