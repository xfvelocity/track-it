<template>
  <div class="add-meal">
    <v-icon class="ml-2 mt-2 cursor-pointer" size="large" @click="backToggled">
      mdi-chevron-left
    </v-icon>

    <CreateMeal
      v-if="createMeal"
      :editing="isEditing"
      :editing-meal="selectedMeal"
      @return="createMeal = false"
    />

    <div class="pa-4" v-else>
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Meals</h2>
        <v-btn variant="text" size="small" @click="createMeal = true">
          Create Meal
          <v-icon class="ml-1">mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-text-field class="mb-4" label="Search" v-model="search" dense />

      <div class="d-flex flex-wrap justify-space-between">
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

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Meal } from '../types/mealPlan.types'

  import RecipeCard from '../components/RecipeCard.vue'
  import CreateMeal from './create-meal/CreateMeal.vue'
  import { useRoute } from 'vue-router'
  import router from '@/router'

  export default defineComponent({
    name: 'AddMeal',
    components: {
      RecipeCard,
      CreateMeal,
    },
    setup(props, context) {
      const store: Store<any> = useStore()
      const route = useRoute()

      const mealList = ref<Meal[]>([])
      const createMeal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()
      const isEditing = ref<boolean>(false)
      const search = ref<string>('')

      const getMeals = async (): Promise<void> => {
        mealList.value = await store.dispatch('getRecipes')
      }

      const editMeal = (meal: Meal): void => {
        selectedMeal.value = meal
        isEditing.value = true
        createMeal.value = true
      }

      const addMeal = async (meal: Meal): Promise<void> => {
        await store.dispatch('addMeal', {
          meal,
          time: route.query.time,
          mealPlan: store.state.recipe.mealPlan,
        })

        store.commit('setSnackbar', {
          color: '',
          text: `${meal.name} was added`,
          isVisible: true,
        })
      }

      const filteredMeals = computed<Meal[]>(() =>
        mealList.value.filter((x) =>
          x.name.toLowerCase().includes(search.value.toLowerCase())
        )
      )

      const deleteMeal = (meal: Meal): void => {
        store.dispatch('delRecipe', meal)
      }

      const backToggled = (): void => {
        if (createMeal.value) {
          createMeal.value = false
        } else {
          router.push('/meal-plan/meals')
        }
      }

      onBeforeMount(getMeals)

      return {
        search,
        mealList,
        selectedMeal,
        isEditing,
        createMeal,
        filteredMeals,
        addMeal,
        backToggled,
        editMeal,
        deleteMeal,
      }
    },
  })
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
