<template>
  <div class="add-meal">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2>Meals</h2>
      <v-btn
        variant="text"
        size="small"
        @click="$router.push('/meal-prep/add-meal/create-meal')"
      >
        Create Meal
        <v-icon class="ml-1">mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-wrap justify-space-between">
      <MealExpansionPanel
        :meal-list="mealList"
        @edit="editMeal"
        @delete="deleteMeal"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import router from '@/router'
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Meal } from '../create-meal/types/CreateMeal.types'

  import MealExpansionPanel from '../components/MealExpansionPanel.vue'

  export default defineComponent({
    name: 'AddMeal',
    components: { MealExpansionPanel },
    setup() {
      const store: Store<any> = useStore()

      const mealList = ref<Meal[]>([])

      const getMeals = async (): Promise<void> => {
        mealList.value = await store.dispatch('getRecipes')
      }

      const editMeal = (meal: Meal): void => {
        store.commit('setEditingMeal', {
          meal,
          currentScreen: 1,
          editing: true,
        })
        router.push('/meal-prep/add-meal/create-meal')
      }

      const deleteMeal = (meal: Meal): void => {
        store.dispatch('delRecipe', meal)
      }

      onBeforeMount(getMeals)

      return {
        mealList,
        editMeal,
        deleteMeal,
      }
    },
  })
</script>
