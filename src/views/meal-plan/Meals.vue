<template>
  <div>
    <xf-icon class="xf-mr-2" src="icons/calendar.svg" fill="white" :size="16" />
    <span>This week</span>
  </div>

  <div class="xf-mt-6">
    <div v-for="(key, i) in keys" :key="i" class="xf-text-capitalize xf-mb-8">
      <div
        class="xf-flex xf-flex-align-items-center xf-cursor-pointer xf-mb-2"
        @click="addMeal(key)"
      >
        <h4 class="xf-text-capitalize">{{ key }}</h4>

        <xf-icon class="xf-ml-auto" src="icons/plus.svg" fill="white" />
      </div>

      <meal-card
        :meal-list="mealPlan[key]"
        :show-edit="false"
        @delete="deleteFromMealPlan"
      />
    </div>

    <div
      class="meals-nutrients ti-max-width xf-center-horizontal xf-px-4 xf-flex xf-flex-justify-content-between"
    >
      <div
        v-for="(macros, name, i) in calculatedMacros"
        :key="i"
        class="meals-nutrients-item xf-text-center"
      >
        <p class="xf-text-capitalize xf-text-14 xf-fw-700 xf-mb-1">
          {{ name }}
        </p>

        <p class="xf-text-14">{{ macros }} / {{ nutrientGoals[name] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { IngredientMacros } from './add-meal/types/addMeal.types'

  import { XfIcon } from 'xf-cmpt-lib'
  import MealCard from '@/components/meal-card/MealCard.vue'

  // ** Data **
  const userStore = useUserStore()
  const mealStore = useMealStore()
  const router = useRouter()

  const { mealPlan } = storeToRefs(mealStore)
  const { nutrientGoals } = storeToRefs(userStore)

  const keys: ['breakfast', 'lunch', 'dinner'] = [
    'breakfast',
    'lunch',
    'dinner',
  ]

  // ** Computed **
  const calculatedMacros = computed<IngredientMacros>(() => {
    let macros: IngredientMacros = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }

    keys.forEach((key) => {
      mealPlan.value[key].forEach((meal) => {
        Object.keys(meal.macros).forEach((key) => {
          macros[key as keyof IngredientMacros] += parseInt(meal.macros[key])
        })
      })
    })

    return macros
  })

  // ** Methods **
  const addMeal = (time: string): void => {
    mealStore.mealTime = time

    router.push('/add-meal')
  }

  const deleteFromMealPlan = async (meal: any): Promise<void> => {
    await mealStore.delFromMealPlan(meal.uuid)
  }

  // ** Lifecycle **
  onMounted(async () => {
    await mealStore.getMealPlan()
  })
</script>

<style lang="scss" scoped>
  .meals {
    &-nutrients {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 100%;

      &-item {
        width: 70px;
      }
    }
  }
</style>
