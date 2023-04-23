<template>
  <div>
    <xf-icon class="xf-mr-2" src="icons/calendar.svg" fill="white" :size="16" />
    <span>This week</span>
  </div>

  <div class="xf-mt-6">
    <div v-for="(key, i) in keys" :key="i" class="xf-text-capitalize xf-mb-8">
      <div
        class="xf-flex xf-flex-align-items-center xf-cursor-pointer"
        @click="toggleAddMealModal(key)"
      >
        <h4 class="xf-text-capitalize">{{ key }}</h4>

        <xf-icon class="xf-ml-auto" src="icons/plus.svg" fill="white" />
      </div>

      <meal-card
        v-if="mealPlan"
        :meal-list="mealPlan[key]"
        :show-edit="false"
        @delete="deleteMeal($event, key)"
      />
    </div>

    <div
      class="meals-nutrients ti-max-width xf-center-horizontal xf-px-6 xf-flex xf-flex-justify-content-between"
    >
      <div
        v-for="(nutrient, name, i) in nutrients"
        :key="i"
        class="meals-nutrients-item xf-text-center"
      >
        <p class="xf-text-capitalize xf-text-14 xf-fw-700 xf-mb-1">
          {{ name }}
        </p>

        <p class="xf-text-14">{{ nutrient }} / {{ nutrientGoals[name] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref, watch } from 'vue'
  import { Meal, MealNutrients } from './types/mealPlan.types'
  import { nutrientsBase } from './data/mealPlan.data'
  import { useRouter } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import moment from 'moment'

  import { XfIcon } from 'xf-cmpt-lib'
  import MealCard from '@/components/meal-card/MealCard.vue'

  // ** Data **
  const userStore = useUserStore()
  const mealStore = useMealStore()
  const router = useRouter()

  const { mealPlan } = storeToRefs(mealStore)
  const { nutrientGoals } = storeToRefs(userStore)

  const nutrients = ref<MealNutrients>(nutrientsBase)
  const keys: ['breakfast', 'lunch', 'dinner'] = [
    'breakfast',
    'lunch',
    'dinner',
  ]

  // ** Methods **
  const toggleAddMealModal = (mealTime: string): void => {
    router.push({
      path: '/meal-plan/add-meal',
      query: { time: mealTime },
    })
  }

  const calculateNutrients = (): void => {
    nutrients.value = { ...nutrientsBase }

    keys.forEach((key) => {
      mealPlan.value[key].forEach((meal: Meal) => {
        Object.keys(nutrients.value).forEach((nutrientKey) => {
          nutrients.value[nutrientKey as keyof MealNutrients]! +=
            meal.nutrients[nutrientKey as keyof MealNutrients] || 0
        })
      })
    })
  }

  const deleteMeal = async (meal: Meal, time: string): Promise<void> => {
    await mealStore.delMeal(meal, mealPlan.value, time)
  }

  // ** Lifecycle **
  onBeforeMount(async () => {
    const today: string = moment().format('YYYY-MM-DD')
    const isBefore: boolean = moment(mealStore.lastUpdated).isBefore(
      today,
      'day'
    )

    // If meals were last updated a day ago - update with todays date
    if (isBefore) {
      mealPlan.value.date = today
    }

    await mealStore.getMeals(mealPlan.value.date)
  })

  // ** Watchers **
  watch(mealPlan, calculateNutrients)
</script>

<style lang="scss" scoped>
  .meals {
    &-nutrients {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 100%;

      &-item {
        width: 60px;
      }
    }
  }
</style>
