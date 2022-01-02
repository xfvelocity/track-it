<template>
  <div class="add-meal">
    <div class="d-flex justify-space-between">
      <h2>Meals</h2>
      <v-btn color="blue" @click="$router.push('/meal-prep/create-meal')"
        >Create Meal</v-btn
      >
    </div>
    <div class="d-flex flex-wrap justify-space-between">
      <v-card
        style="width: 48%"
        class="add-meal__card my-4"
        v-for="(meal, i) in mealList"
        :key="i"
      >
        <div>
          <img class="w-100" :src="meal.img" alt="" />
        </div>
        <v-card-title>{{ meal.name }}</v-card-title>
        <v-card-actions>
          <v-btn color="blue" style="width: 48%" @click="editMeal(meal)">
            <span class="material-icons"> edit </span>
          </v-btn>
          <v-btn color="red" style="width: 48%" @click="deleteMeal(meal)">
            <span class="material-icons"> delete </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
  import router from '@/router'
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Recipe } from './create-meal/types/CreateMeal.types'

  export default defineComponent({
    name: 'AddMeal',
    setup(props, context) {
      const mealList = ref<Recipe[]>([])
      const store: Store<any> = useStore()

      const getMeals = async (): Promise<void> => {
        mealList.value = await store.dispatch('getRecipes')
      }

      const editMeal = (meal: Recipe): void => {
        store.commit('setEditingMeal', meal)
        router.push('/meal-prep/create-meal')
      }

      const deleteMeal = (meal: Recipe): void => {
        store.dispatch('delRecipe', meal)
      }

      onBeforeMount(getMeals)

      return {
        editMeal,
        deleteMeal,
        mealList,
      }
    },
  })
</script>

<style lang="scss">
  .add-meal {
    &__card {
      background: #2b2066;
    }
  }
</style>
