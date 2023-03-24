<template>
  <div class="add-meal">
    <xf-icon
      class="xf-my-2 xf-cursor-pointer"
      :size="16"
      fill="white"
      src="icons/chevron-left.svg"
      @click="backToggled"
    />

    <CreateMeal
      v-if="createMeal"
      :editing="isEditing"
      :editing-meal="selectedMeal"
      @return="onMealChange"
    />

    <div v-else class="xf-pa-4">
      <div class="xf-flex-center-between xf-h-max-content xf-mb-4">
        <h2>Meals</h2>

        <xf-button
          class="xf-ml-auto"
          background-colour="transparent"
          icon="icons/plus.svg"
          @click="createMeal = true"
        >
          Create Meal
        </xf-button>
      </div>

      <xf-text-input v-model="search" colour="white" label="Search" />

      <div class="xf-mt-4 xf-flex xf-flex-wrap xf-flex-justify-space-between">
        <RecipeCard
          :meal-list="filteredMeals"
          add-icon
          @meal-added="($event) => addMeal($event)"
          @edit="editMeal"
          @delete="deleteMeal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref, computed } from 'vue'
  import { Meal } from './types/mealPlan.types'
  import { useRoute } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import router from '@/router'

  import { XfIcon, XfButton, XfTextInput } from 'xf-cmpt-lib'
  import RecipeCard from './components/RecipeCard.vue'
  import CreateMeal from './CreateMeal.vue'

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
    .v-card {
      background: rgb(9, 0, 66) !important;
      background: linear-gradient(
        144deg,
        rgba(9, 0, 66, 1) 0%,
        rgba(11, 0, 78, 1) 100%
      ) !important;
    }
  }
</style>
