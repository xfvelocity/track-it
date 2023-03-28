<template>
  <xf-nav
    background-colour="transparent"
    drawer-background-colour="blue-darken-4"
    menu-button-colour="white"
  >
    <div class="xf-flex xf-flex-align-items-center" @click="router.push('/')">
      <img src="/img/icons/logo.svg" />
      <h1 class="xf-ml-2 xf-text-24">Track IT</h1>
    </div>

    <template #menu>
      <div class="nav-menu xf-py-2 xf-px-4 xf-bg-blue-darken-4">
        <ul>
          <li
            v-for="(option, i) in menuOptions"
            :key="i"
            class="xf-py-2 xf-hover xf-cursor-pointer"
            @click="handleMenuClick(option)"
          >
            <xf-icon
              :src="`icons/${option.icon}.svg`"
              class="xf-mr-1"
              fill="white"
            />
            {{ option.text }}
          </li>
        </ul>
      </div>
    </template>
  </xf-nav>
</template>

<script lang="ts" setup>
  import { signUserOut } from '@/api/auth'

  import { Router, useRouter } from 'vue-router'
  import { MenuItem } from './types/Nav.types'

  import { XfNav, XfIcon } from 'xf-cmpt-lib'

  // ** Data **
  const router: Router = useRouter()

  const menuOptions: MenuItem[] = [
    {
      text: 'Meal Plan',
      route: '/meal-plan/meals',
      icon: 'food',
    },
    {
      text: 'Shopping',
      route: '/shopping',
      icon: 'shopping',
    },
    {
      text: 'Sign out',
      event: signUserOut,
      icon: 'sign-out',
    },
  ]

  // ** Methods **
  const handleMenuClick = (option: MenuItem): void => {
    if (option.route) {
      router.push(option.route)
    } else if (option.event) {
      option.event()
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.xf-nav) {
    box-shadow: none !important;
  }

  .nav {
    &-menu {
      border-radius: 10px;
    }
  }
</style>
