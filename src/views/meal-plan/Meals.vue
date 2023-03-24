<template>
  <div>
    <div class="xf-flex xf-flex-justify-content-between">
      <xf-icon
        class="xf-cursor-pointer"
        src="icons/chevron-left.svg"
        fill="white"
        @click="changeDate(-1)"
      />

      <v-menu>
        <template v-slot:activator="{ props }">
          <span class="xf-cursor-pointer" v-bind="props">
            <xf-icon class="xf-mr-1" src="icons/calendar.svg" fill="white" />
            {{ formatDate(mealPlan.date) }}
          </span>
        </template>

        <v-date-picker
          :model-value="mealPlan.date"
          class="xf-mt-2"
          @dayclick="onDateChange"
        />
      </v-menu>

      <xf-icon
        class="xf-cursor-pointer"
        src="icons/chevron-right.svg"
        fill="white"
        @click="changeDate(1)"
      />
    </div>

    <div class="xf-mt-4">
      <div v-for="(key, i) in keys" :key="i" class="xf-text-capitalize xf-mb-8">
        <div
          class="xf-flex xf-flex-align-items-center xf-cursor-pointer"
          @click="toggleAddMealModal(key)"
        >
          <h4 class="xf-text-capitalize">{{ key }}</h4>

          <xf-icon class="xf-ml-auto" src="icons/plus.svg" fill="white" />
        </div>

        <RecipeCard
          v-if="mealPlan"
          :meal-list="mealPlan[key]"
          :show-edit="false"
          @delete="deleteMeal($event, key)"
        />
      </div>

      <div class="xf-flex xf-pt-6">
        <p
          v-for="(nutrient, name, i) in nutrients"
          :key="i"
          class="xf-text-capitalize xf-text-14 xf-mr-3"
        >
          {{ name }}: {{ nutrient }}
        </p>
      </div>

      <div class="xf-flex xf-pt-2">
        <p
          v-for="(nutrient, name, i) in nutrientGoals"
          :key="i"
          class="xf-text-capitalize xf-text-14 xf-mr-3"
        >
          {{ name }}: {{ nutrient }}
        </p>
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

  import { XfIcon } from 'xf-cmpt-lib'
  import RecipeCard from './components/RecipeCard.vue'
  import moment from 'moment'

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

  const formatDate = (date: string): string => {
    const [_year, month, day] = date.split('-')

    return `${day}/${month}`
  }

  const onDateChange = async (date: any): Promise<void> => {
    await mealStore.getMeals(date.id)
  }

  const changeDate = (val: number): void => {
    const date: Date = new Date(mealPlan.value.date)

    if (val === -1) {
      date.setDate(date.getDate() - 1)
    } else {
      date.setDate(date.getDate() + 1)
    }

    const [day, month, year] = date.toLocaleDateString().split('/')
    onDateChange({ id: `${year}-${month}-${day}` })
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
