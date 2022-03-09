<template>
  <div class="bottom-nav">
    <div
      class="bottom-nav__option bottom-nav__option-back"
      @click="router.go(-1)"
    >
      <v-icon size="large">mdi-chevron-left</v-icon>
    </div>
    <v-spacer />
    <div
      class="bottom-nav__option"
      :class="`bottom-nav__option-${option.text.toLowerCase()}`"
      v-for="(option, i) in options"
      :key="i"
      @click="optionClicked(option.link)"
    >
      <v-icon>{{ option.icon }}</v-icon>
      {{ option.text }}
    </div>
    <v-spacer />
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
        // {
        //   text: 'Back',
        //   link: 'back',
        //   icon: 'mdi-chevron-left',
        // },
        {
          text: 'Home',
          link: '/',
          icon: 'mdi-home',
        },
        {
          text: 'Meal Prep',
          link: '/meal-prep',
          icon: 'mdi-food',
        },
        {
          text: 'Workout',
          link: '/add-workout',
          icon: 'mdi-dumbbell',
        },
      ]

      const optionClicked = (link: string): void => {
        if (link === 'back') {
          router.go(-1)
        } else {
          router.push(link)
        }
      }

      return {
        options,
        optionClicked,
        router,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #0a090e;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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

      &-back {
        padding-right: 0;
      }
    }
  }
</style>
