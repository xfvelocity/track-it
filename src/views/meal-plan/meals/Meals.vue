<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <span class="date-box cursor-pointer" v-bind="props">
          <v-icon class="mr-1" size="small">mdi-calendar</v-icon>
          {{ formatDate(mealPlan.date) }}
        </span>
      </template>

      <v-date-picker
        :model-value="mealPlan.date"
        class="mt-2"
        @dayclick="onDateChange"
      />
    </v-menu>

    <div class="mt-4">
      <div v-for="(key, i) in keys" :key="i" class="text-capitalize mb-6">
        <div class="d-flex align-center">
          <h4>{{ key }}</h4>
          <v-spacer />
          <v-icon
            class="ml-1 cursor-pointer"
            color="white"
            size="small"
            @click="toggleAddMealModal(key)"
          >
            mdi-plus
          </v-icon>
        </div>

        <RecipeCard
          v-if="mealPlan"
          :meal-list="mealPlan[key]"
          :show-edit="false"
          @delete="deleteMeal($event, key)"
        />
      </div>

      <div class="d-flex pt-6">
        <p
          class="text-capitalize mr-3"
          style="font-size: 14px"
          v-for="(nutrient, name, i) in nutrients"
          :key="i"
        >
          <span class="font-weight-medium">{{ name }}:</span>
          {{ nutrient }}
        </p>
      </div>

      <div class="d-flex pt-2">
        <p
          class="text-capitalize mr-3"
          style="font-size: 14px"
          v-for="(nutrient, name, i) in nutrientGoals"
          :key="i"
        >
          <span class="font-weight-medium">{{ name }}:</span>
          {{ nutrient }}
        </p>
      </div>
    </div>

    <!-- <AddMeal
      v-model="isAddMealOpen"
      @meal-added="addMeal"
      @close="isAddMealOpen = false"
    /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed, watch } from 'vue'
  import { Store, useStore } from 'vuex'
  import { Meal, MealPlan, MealNutrients } from '../types/mealPlan.types'
  import { nutrientsBase } from '../data/mealPlan.data'
  import { DatePicker } from 'v-calendar'

  import RecipeCard from '../components/RecipeCard.vue'
  import AddMeal from '../add-meal/AddMeal.vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Meals',
    components: {
      RecipeCard,
      AddMeal,
      DatePicker,
    },
    setup() {
      const store: Store<any> = useStore()
      const router = useRouter()

      const isAddMealOpen = ref<boolean>(false)
      const selectedMealTime = ref<string>('')
      const keys: ['breakfast', 'lunch', 'dinner'] = [
        'breakfast',
        'lunch',
        'dinner',
      ]
      const nutrients = ref<MealNutrients>(nutrientsBase)
      const nutrientGoals = ref<MealNutrients>(
        store.getters.getUserData.nutrientGoals
      )

      onBeforeMount(async () => {
        await store.dispatch('getMeals', mealPlan.value.date)
      })

      const mealPlan = computed<MealPlan>(() => store.state.recipe.mealPlan)

      const toggleAddMealModal = (mealTime: string): void => {
        router.push({
          path: '/meal-plan/add-meal',
          query: { time: mealTime },
        })
      }

      const formatDate = (date: string): string => {
        const [year, month, day] = date.split('-')
        return `${day}/${month}`
      }

      const onDateChange = async (date: any): Promise<void> => {
        await store.dispatch('getMeals', date.id)
      }

      const calculateNutrients = (): void => {
        nutrients.value = { ...nutrientsBase }

        keys.forEach((key) => {
          mealPlan.value[key].forEach((meal: Meal) => {
            Object.keys(nutrients.value).forEach((nutrientKey) => {
              nutrients.value[nutrientKey as keyof MealNutrients]! +=
                meal.nutrients[nutrientKey as keyof MealNutrients] || 0
            })
          })
        })
      }

      const deleteMeal = async (meal: Meal, time: string): Promise<void> => {
        await store.dispatch('delMeal', {
          meal,
          mealPlan: mealPlan.value,
          time,
        })
      }

      watch(mealPlan, calculateNutrients)

      return {
        isAddMealOpen,
        nutrientGoals,
        onDateChange,
        nutrients,
        keys,
        toggleAddMealModal,
        deleteMeal,
        mealPlan,
        selectedMealTime,
        formatDate,
      }
    },
  })
</script>
