<template>
  <div class="add-meal">
    <div class="d-flex justify-space-between">
      <h2>Meals</h2>
      <v-btn color="primary" @click="$router.push('/meal-prep/create-meal')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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
          <v-icon class="mr-2" @click="isOptionsShowing = !isOptionsShowing"
            >mdi-chevron-down</v-icon
          >
        </div>
        <v-expand-transition>
          <div v-show="isOptionsShowing">
            <v-divider></v-divider>
            <div class="d-flex py-2 mr-2">
              <v-spacer></v-spacer>
              <v-btn class="mr-2" color="blue" @click="editMeal(meal)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="red" @click="deleteMeal(meal)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-expand-transition>
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

      onBeforeMount(getMeals)

      return {
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
