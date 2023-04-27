import { queryApi, api } from '@/api/api'
import { mealPlanBase } from '@/views/meal-plan/data/mealPlan.data'
import { Meal, MealPlan } from '@/views/meal-plan/types/mealPlan.types'
import moment from 'moment'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'

export const useMealStore = defineStore('meals', {
  state: (): any => ({
    recipes: [],
    mealPlan: { ...mealPlanBase },
    ingredients: [],
    lastUpdated: '',
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
    async addMeal(
      time: 'breakfast' | 'lunch' | 'dinner',
      meal: Meal,
      mealPlan: MealPlan
    ): Promise<void> {
      mealPlan[time].push(meal)

      await api(mealPlan.id ? 'PUT' : 'POST', 'meals', mealPlan)
    },

    async getIngredients(): Promise<void> {
      this.ingredients = await api('GET', 'ingredients')
    },
    async getMeals(date: string): Promise<void> {
      let res: any = await queryApi('meals', {
        where: 'date',
        operator: '==',
        value: date,
      })

      if (!res.length) {
        res = JSON.parse(JSON.stringify(mealPlanBase))
        res.date = this.mealPlan.date

        this.mealPlan = res
      } else {
        this.mealPlan = res[0]
      }

      if (this.mealPlan.date !== date) {
        this.mealPlan.date = date
      }

      this.lastUpdated = moment().format('YYYY-MM-DD')
    },
    async delMeal(
      meal: Meal,
      mealPlan: MealPlan,
      time: 'breakfast' | 'lunch' | 'dinner'
    ): Promise<void> {
      const matchingIndex: number = mealPlan[time].indexOf(meal)
      mealPlan[time].splice(matchingIndex, 1)

      await api('PUT', 'meals', mealPlan)
    },
    async addRecipe(meal: Meal): Promise<void> {
      await api('POST', 'recipes', meal)

      meal.ingredients.forEach((ingredient) => {
        const matchingIngredient = this.ingredients.find(
          (i: any) => i.name === ingredient.name
        )

        if (!matchingIngredient) {
          this.addIngredients(ingredient)
        }
      })

      this.recipes.push(meal)
    },
    async getRecipes(): Promise<Meal[] | boolean> {
      const res: any = await api('GET', 'recipes')

      this.recipes = res

      return res
    },
    async editRecipe(meal: Meal): Promise<void> {
      await api('PUT', 'recipes', meal)
    },
    async delRecipe(recipe: Meal): Promise<void> {
      await api('DEL', 'recipes', recipe.id)

      this.recipes.splice(this.recipes.indexOf(recipe), 1)
    },
  },
  persist: true,
})
