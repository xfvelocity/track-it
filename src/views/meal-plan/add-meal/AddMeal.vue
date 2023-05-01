<template>
  <div class="add-meal">
    <div class="xf-flex-center-between xf-h-max-content xf-mb-4">
      <h2>Meals</h2>

      <xf-button
        class="xf-ml-auto add-meal-create-meal-btn"
        background-colour="transparent"
        icon="icons/plus.svg"
        @click="router.push('/add-meal/create-meal')"
      >
        Create Meal
      </xf-button>
    </div>

    <xf-text-input
      v-model="search"
      colour="white"
      outlined
      placeholder="Search"
    />

    <div class="xf-mt-4 xf-flex xf-flex-wrap xf-flex-justify-space-between">
      <meal-card
        :meal-list="filteredMeals"
        show-add-meal
        show-edit
        @meal-added="addedMeal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref, computed } from 'vue'
  import { Meal } from '../types/mealPlan.types'
  import { useRoute } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import router from '@/router'

  import { XfButton, XfTextInput } from 'xf-cmpt-lib'
  import MealCard from '@/components/meal-card/MealCard.vue'

  // ** Data **
  const mealStore = useMealStore()

  const mealList = ref<Meal[]>([])
  const search = ref<string>('')

  // ** Computed **
  const filteredMeals = computed<Meal[]>(() => {
    if (mealList.value?.length) {
      return mealList.value.filter((meal) =>
        meal.name?.toLowerCase().includes(search.value.toLowerCase())
      )
    } else {
      return []
    }
  })

  // ** Methods **
  const getMeals = async (): Promise<void> => {
    mealList.value = await mealStore.getMeals()
  }

  const addedMeal = async (meal: any): Promise<void> => {
    await mealStore.addToMealPlan(meal)

    router.push('/')
  }

  // ** Lifecycle **
  onBeforeMount(getMeals)

  // const editMeal = (meal: Meal): void => {
  //   selectedMeal.value = meal
  //   isEditing.value = true
  // }

  // const onMealChange = (): void => {
  //   isEditing.value = false
  //   selectedMeal.value = undefined
  // }

  // const deleteMeal = async (meal: Meal): Promise<void> => {
  //   await mealStore.delRecipe(meal)
  // }
</script>

<style lang="scss" scoped>
  .add-meal {
    &-create-meal-btn {
      :deep(.xf-button) {
        padding-right: 0 !important;
      }
    }
  }
</style>
