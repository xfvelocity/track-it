<template>
  <nav class="nav d-flex align-center justify-space-between mt-4 mb-6">
    <span class="nav__title d-flex align-center" @click="$router.push('/')">
      <img src="/img/icons/logo.svg" />
      <h1>Track IT</h1>
    </span>

    <v-icon @click="isNavOpen = !isNavOpen">mdi-menu</v-icon>
  </nav>

  <v-navigation-drawer v-model="isNavOpen" location="right" color="cardBlue">
    <v-list class="mt-8" color="cardBlue">
      <v-list-item
        v-for="(option, i) in menuOptions"
        selectable
        :key="i"
        @click="handleMenuClick(option)"
      >
        <v-icon class="mr-2"> {{ option.icon }}</v-icon>
        {{ option.text }}
      </v-list-item>
    </v-list>

    <template #append>
      <v-list class="mb-8" color="cardBlue">
        <v-list-item selectable @click="signUserOut">
          <v-icon class="mr-2">mdi-logout</v-icon> Sign Out
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { signUserOut } from '@/api/auth'
  import { useUserStore } from '@/stores/user'
  import { User } from 'firebase/auth'
  import { Router, useRouter } from 'vue-router'
  import { MenuItem } from './types/Nav.types'

  export default defineComponent({
    name: 'Nav',
    setup() {
      const userStore = useUserStore()
      const router: Router = useRouter()

      const isNavOpen = ref<boolean>(false)

      const loggedInUser = computed<User>(() => userStore.user)

      const menuOptions: MenuItem[] = [
        {
          text: 'Meal Plan',
          route: '/meal-plan/meals',
          icon: 'mdi-food',
        },
        {
          text: 'Shopping',
          route: '/shopping',
          icon: 'mdi-format-list-checks',
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
        isNavOpen,
        loggedInUser,
        menuOptions,
        signUserOut,
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

  .v-list {
    background: #2b2066 !important;
    color: white;
  }
</style>
