<template>
  <div class="add-meal">
    <v-icon class="ml-2 mt-2 cursor-pointer" size="large" @click="backToggled">
      mdi-chevron-left
    </v-icon>

    <CreateMeal
      v-if="createMeal"
      :editing="isEditing"
      :editing-meal="selectedMeal"
      @return="onMealChange"
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
  import { Meal } from '../types/mealPlan.types'
  import { useRoute } from 'vue-router'
  import { useMealStore } from '@/stores/meals'
  import { useConfigStore } from '@/stores/config'
  import router from '@/router'

  import RecipeCard from '../components/RecipeCard.vue'
  import CreateMeal from './create-meal/CreateMeal.vue'

  export default defineComponent({
    name: 'AddMeal',
    components: {
      RecipeCard,
      CreateMeal,
    },
    setup(props, context) {
      const configStore = useConfigStore()
      const mealStore = useMealStore()
      const route = useRoute()

      const mealList = ref<Meal[]>([])
      const createMeal = ref<boolean>(false)
      const selectedMeal = ref<Meal>()
      const isEditing = ref<boolean>(false)
      const search = ref<string>('')

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

      const filteredMeals = computed<Meal[]>(() =>
        mealList.value.filter((x) =>
          x.name.toLowerCase().includes(search.value.toLowerCase())
        )
      )

      const deleteMeal = (meal: Meal): void => {
        mealStore.delRecipe(meal)
      }

      const backToggled = (): void => {
        if (createMeal.value) {
          onMealChange()
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
        onMealChange,
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
