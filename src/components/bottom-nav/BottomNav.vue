<template>
  <div class="bottom-nav">
    <div
      class="bottom-nav__option"
      :class="`bottom-nav__option-${option.text.toLowerCase()}`"
      v-for="(option, i) in options"
      :key="i"
      @click="router.push(option.link)"
    >
      <v-icon>{{ option.icon }}</v-icon>
      {{ option.text }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Router, useRouter } from 'vue-router'
  import { BottomNavOption } from './types/bottomNav.types'

  export default defineComponent({
    name: 'BottomNav',
    setup() {
      const router: Router = useRouter()
      const options: BottomNavOption[] = [
        {
          text: 'Home',
          link: '/',
          icon: 'mdi-home',
        },
        {
          text: 'Meal Plan',
          link: '/meal-plan/meals',
          icon: 'mdi-food',
        },
        {
          text: 'Shopping',
          link: '/shopping',
          icon: 'mdi-format-list-checks',
        },
      ]

      return {
        options,
        router,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #060124;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    z-index: 100;

    &__option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 10px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
