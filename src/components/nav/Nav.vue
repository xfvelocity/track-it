<template>
  <nav class="nav d-flex justify-space-between mt-4 mb-6">
    <span class="nav__title d-flex align-center" @click="$router.push('/')">
      <img src="/img/icons/logo.svg" />
      <h1>Track IT</h1>
    </span>
    <v-menu anchor="bottom">
      <template v-slot:activator="{ props }">
        <span class="nav__user d-flex align-center" v-bind="props">
          <p v-if="showUsername">{{ loggedInUser.displayName }}</p>
          <img :src="loggedInUser.photoURL || ''" alt="" />
        </span>
      </template>

      <v-card color="white">
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
  import { User } from 'firebase/auth'
  import { defineComponent, ref, computed } from 'vue'
  import { Router, useRouter } from 'vue-router'
  import { Store, useStore } from 'vuex'
  import { MenuItem } from './types/Nav.types'

  export default defineComponent({
    name: 'Nav',
    setup() {
      const store: Store<any> = useStore()
      const router: Router = useRouter()

      const showUsername = ref<boolean>(false)
      const loggedInUser = computed<User>(() => store.state.config.currentUser)

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
        showUsername,
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
