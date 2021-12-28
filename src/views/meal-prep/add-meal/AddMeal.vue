<template>
  <div class="add-meal mt-4">
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
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Recipe } from './create-meal/types/CreateMeal.types'

  export default defineComponent({
    name: 'AddMeal',
    setup(props, context) {
      const mealList = ref<Recipe[]>([])
      const store: Store<any> = useStore()

      const getMeals = async (): Promise<void> => {
        await store.dispatch('getRecipes')
        mealList.value = store.state.recipe.recipes
      }

      onBeforeMount(getMeals)

      return {
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
