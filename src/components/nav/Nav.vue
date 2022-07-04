<template>
  <nav class="nav d-flex justify-space-between mt-4 mb-6">
    <span class="nav__title d-flex align-center" @click="$router.push('/')">
      <img src="/img/icons/logo.svg" />
      <h1>Track IT</h1>
    </span>

    <v-menu anchor="bottom">
      <template v-slot:activator="{ props }">
        <span class="nav__user d-flex align-center" v-bind="props">
          <img
            v-if="loggedInUser.photoURL"
            :src="loggedInUser.photoURL"
            alt=""
          />
        </span>
      </template>

      <v-card class="mt-4" color="white">
        <v-list color="white">
          <v-list-item
            v-for="(option, i) in menuOptions"
            selectable
            :key="i"
            @click="handleMenuClick(option)"
          >
            {{ option.text }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </nav>
</template>

<script lang="ts">
  import { signUserOut } from '@/api/auth'
  import { useUserStore } from '@/stores/user'
  import { User } from 'firebase/auth'
  import { defineComponent, computed } from 'vue'
  import { Router, useRouter } from 'vue-router'
  import { MenuItem } from './types/Nav.types'

  export default defineComponent({
    name: 'Nav',
    setup() {
      const userStore = useUserStore()
      const router: Router = useRouter()

      const loggedInUser = computed<User>(() => userStore.user)

      const menuOptions: MenuItem[] = [
        {
          text: 'My Profile',
          route: '/profile',
        },
        {
          text: 'Sign Out',
          event: signUserOut,
        },
      ]

      const handleMenuClick = (option: MenuItem): void => {
        if (option.route) {
          router.push(option.route)
        } else if (option.event) {
          option.event()
        }
      }

      return {
        loggedInUser,
        menuOptions,
        handleMenuClick,
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
      margin-top: 12px;
      cursor: pointer;
      height: 35px;
      width: 35px;
      border-radius: 100%;
      background: white;

      p {
        margin-right: 10px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
</style>
