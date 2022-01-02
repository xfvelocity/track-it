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
        <!-- <div>
          <img class="w-100" :src="meal.img" alt="" />
        </div> -->
        <div class="d-flex align-center">
          <v-card-title>{{ meal.name }}</v-card-title>
          <v-spacer></v-spacer>
          <v-icon @click="toggleOptions">mdi-dots-vertical</v-icon>
        </div>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-pencil"
            size="x-small"
            color="blue"
            @click="editMeal(meal)"
          />
          <v-btn
            icon="mdi-delete"
            size="x-small"
            color="red"
            @click="deleteMeal(meal)"
          />
        </v-card-actions> -->
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
      const isOptionsShowing = ref<boolean>(false)
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

      const toggleOptions = () => {}

      onBeforeMount(getMeals)

      return {
        toggleOptions,
        isOptionsShowing,
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
