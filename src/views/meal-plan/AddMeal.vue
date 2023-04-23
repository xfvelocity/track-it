<template>
  <div class="add-meal">
    <create-meal
      v-if="createMeal"
      :editing="isEditing"
      :editing-meal="selectedMeal"
      @return="onMealChange"
    />

    <template v-else>
      <div class="xf-flex-center-between xf-h-max-content xf-mb-4">
        <h2>Meals</h2>

        <xf-button
          class="xf-ml-auto add-meal-create-meal-btn"
          background-colour="transparent"
          icon="icons/plus.svg"
          @click="createMeal = true"
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
          add-icon
          @meal-added="addMeal"
          @edit="editMeal"
          @delete="deleteMeal"
        />
      </div>
    </template>
  </div>

  <bottom-nav @back="backToggled" />
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref, computed } from 'vue'
  import { Meal } from './types/mealPlan.types'
  import { useRoute } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import router from '@/router'

  import { XfIcon, XfButton, XfTextInput } from 'xf-cmpt-lib'
  import MealCard from '@/components/meal-card/MealCard.vue'
  import CreateMeal from '@/components/meal/CreateMeal.vue'
  import BottomNav from '@/components/nav/BottomNav.vue'

  // ** Data **
  const configStore = useConfigStore()
  const mealStore = useMealStore()
  const route = useRoute()

  const mealList = ref<Meal[]>([])
  const createMeal = ref<boolean>(false)
  const selectedMeal = ref<Meal>()
  const isEditing = ref<boolean>(false)
  const search = ref<string>('')

  // ** Computed **
  const filteredMeals = computed<Meal[]>(() =>
    mealList.value.filter((meal) =>
      meal.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  // ** Methods **
  const getMeals = async (): Promise<void> => {
    mealList.value = await mealStore.getRecipes()
  }

  const editMeal = (meal: Meal): void => {
    selectedMeal.value = meal
    isEditing.value = true
    createMeal.value = true
  }

  const onMealChange = (): void => {
    createMeal.value = false
    isEditing.value = false
    selectedMeal.value = undefined
  }

  const addMeal = async (meal: Meal): Promise<void> => {
    await mealStore.addMeal(route.query.time, meal, mealStore.mealPlan)

    configStore.snackbar = {
      color: 'green',
      text: `${meal.name} added for ${route.query.time}`,
      isVisible: true,
    }
  }

  const deleteMeal = async (meal: Meal): Promise<void> => {
    await mealStore.delRecipe(meal)
  }

  const backToggled = (): void => {
    if (createMeal.value) {
      onMealChange()
    } else {
      router.push('/meal-plan/meals')
    }
  }

  // ** Lifecycle **
  onBeforeMount(getMeals)
</script>

<style lang="scss" scoped>
  .add-meal {
    &-create-meal-btn {
      padding-right: 0 !important;
    }
  }
</style>
