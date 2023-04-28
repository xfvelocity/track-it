import { api } from '@/api/api'
import {
  creatingMealBase,
  mealPlanBase,
} from '@/views/meal-plan/data/mealPlan.data'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { MealState } from './types/meal.types'

export const useMealStore = defineStore('meals', {
  state: (): MealState => ({
    mealPlan: { ...mealPlanBase },
    mealTime: '',
    creatingMeal: {
      ...creatingMealBase,
    },
  }),
  actions: {
    async createIngredient(ingredient: any): Promise<void> {
      const configStore = useConfigStore()

      configStore.loading = true

      await api('POST', 'ingredients', ingredient)

      configStore.loading = false

      configStore.snackbar = {
        color: 'green',
        isVisible: true,
        text: 'Ingredient successfully created',
      }
    },
    async getIngredients(): Promise<any> {
      const configStore = useConfigStore()

      configStore.loading = true

      const res = await api('GET', 'ingredients')

      configStore.loading = false

      return res?.data
    },
    async addMeal(): Promise<void> {
      const configStore = useConfigStore()

      configStore.loading = true

      await api('POST', 'meals', this.creatingMeal)

      configStore.loading = false

      configStore.snackbar = {
        color: 'green',
        isVisible: true,
        text: 'Meal added',
      }

      this.creatingMeal = { ...creatingMealBase }
    },
    async getMeals(): Promise<any> {
      const configStore = useConfigStore()

      configStore.loading = true

      const res = await api('GET', 'meals')

      configStore.loading = false

      return res?.data
    },
    async addToMealPlan(meal: any): Promise<any> {
      const configStore = useConfigStore()

      configStore.loading = true

      await api('POST', 'meal-plan', { time: this.mealTime, ...meal })

      this.mealTime = ''

      configStore.loading = false
    },
    async getMealPlan(): Promise<void> {
      const configStore = useConfigStore()
      const plan: any = {
        breakfast: [],
        lunch: [],
        dinner: [],
      }

      configStore.loading = true

      const res = await api('GET', 'meal-plan')

      res?.data.forEach((meal: any) => plan[meal.time].push(meal))

      this.mealPlan = plan

      configStore.loading = false
    },
  },
  persist: true,
})
