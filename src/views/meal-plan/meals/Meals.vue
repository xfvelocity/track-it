<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-icon class="cursor-pointer" color="white" @click="changeDate(-1)">
        mdi-chevron-left
      </v-icon>
      <v-menu>
        <template v-slot:activator="{ props }">
          <span class="cursor-pointer" v-bind="props">
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
      <v-icon class="cursor-pointer" color="white" @click="changeDate(1)">
        mdi-chevron-right
      </v-icon>
    </div>

    <div class="mt-4">
      <div v-for="(key, i) in keys" :key="i" class="text-capitalize mb-8">
        <div
          class="d-flex align-center cursor-pointer"
          @click="toggleAddMealModal(key)"
        >
          <h4>{{ key }}</h4>
          <v-spacer />
          <v-icon class="ml-1" color="white" size="small"> mdi-plus </v-icon>
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
          {{ name }}: {{ nutrient }}
        </p>
      </div>

      <div class="d-flex pt-2">
        <p
          class="text-capitalize mr-3"
          style="font-size: 14px"
          v-for="(nutrient, name, i) in nutrientGoals"
          :key="i"
        >
          {{ name }}: {{ nutrient }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed, watch } from 'vue'
  import { Meal, MealPlan, MealNutrients } from '../types/mealPlan.types'
  import { nutrientsBase } from '../data/mealPlan.data'
  import { DatePicker } from 'v-calendar'
  import { useRouter } from 'vue-router'
  import { useMealStore } from '@/stores/meals'

  import RecipeCard from '../components/RecipeCard.vue'
  import { useUserStore } from '@/stores/user'
  import moment from 'moment'

  export default defineComponent({
    name: 'Meals',
    components: {
      RecipeCard,
      DatePicker,
    },
    setup() {
      const userStore = useUserStore()
      const mealStore = useMealStore()
      const router = useRouter()

      const isAddMealOpen = ref<boolean>(false)
      const selectedMealTime = ref<string>('')
      const keys: ['breakfast', 'lunch', 'dinner'] = [
        'breakfast',
        'lunch',
        'dinner',
      ]
      const nutrients = ref<MealNutrients>(nutrientsBase)
      const nutrientGoals = ref<MealNutrients>(userStore.nutrientGoals)

      onBeforeMount(async () => {
        const today: string = moment().format('YYYY-MM-DD')
        const isBefore: boolean = moment(mealStore.lastUpdated).isBefore(
          today,
          'day'
        )

        // If meals were last updated a day ago - update with todays date
        if (isBefore) {
          mealPlan.value.date = today
        }

        await mealStore.getMeals(mealPlan.value.date)
      })

      const mealPlan = computed<MealPlan>(() => mealStore.mealPlan)

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
        await mealStore.getMeals(date.id)
      }

      const changeDate = (val: number): void => {
        const date: Date = new Date(mealPlan.value.date)

        if (val === -1) {
          date.setDate(date.getDate() - 1)
        } else {
          date.setDate(date.getDate() + 1)
        }

        const [day, month, year] = date.toLocaleDateString().split('/')
        onDateChange({ id: `${year}-${month}-${day}` })
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
        await mealStore.delMeal(meal, mealPlan.value, time)
      }

      watch(mealPlan, calculateNutrients)

      return {
        isAddMealOpen,
        nutrientGoals,
        onDateChange,
        changeDate,
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
