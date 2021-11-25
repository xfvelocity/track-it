<template>
  <nav class="nav">
    <span class="nav__title" @click="$router.push('/')">
      <img :src="require('./logo.svg')" />
      <h1>Track IT</h1>
    </span>
    <span class="nav__user">
      <p v-if="showUsername">{{ loggedInUser.name }}</p>
      <img :src="loggedInUser.avatar" alt="" />
    </span>
  </nav>
</template>

<script setup lang="ts">
const showUsername: boolean = false;
const loggedInUser: { name: string; avatar: string } = {
  name: "Alex Long",
  avatar: require("../../../assets/avatar.png"),
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;

  &__title {
    display: flex;

    h1 {
      color: white;
      margin-left: 15px;
      letter-spacing: 0.4 rem;
      font-weight: 500;
    }

    img {
      width: 50px;
    }
  }

  &__user {
    display: flex;
    align-items: center;

    p {
      color: white;
      margin-right: 10px;
    }

    img {
      max-width: 40px;
      border-radius: 50%;
    }
  }
}
</style>
