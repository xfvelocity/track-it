import api, { queryApi } from '@/api/api'
import { mealPlanBase } from '@/views/meal-plan/data/mealPlan.data'
import { Meal, MealPlan } from '@/views/meal-plan/types/mealPlan.types'
import { defineStore } from 'pinia'

export const useMealStore = defineStore('meals', {
  state: (): any => ({
    recipes: [],
    mealPlan: { ...mealPlanBase },
    ingredients: [],
    lastUpdated: '',
  }),
  actions: {
    async addMeal(
      time: 'breakfast' | 'lunch' | 'dinner',
      meal: Meal,
      mealPlan: MealPlan
    ): Promise<boolean> {
      let res: any
      let formattedPayload: MealPlan

      mealPlan[time].push(meal)
      formattedPayload = mealPlan

      res = await api(mealPlan.id ? 'PUT' : 'POST', 'meals', formattedPayload)

      return true
    },
    async addIngredients(ingredient: any): Promise<void> {
      await api('POST', 'ingredients', ingredient)
    },
    async getIngredients(): Promise<void> {
      const res = await api('GET', 'ingredients')

      this.ingredients = res
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

      const todaysDate: Date = new Date()
      this.lastUpdated = todaysDate
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
    async addRecipe(meal: Meal): Promise<boolean> {
      const res: any = await api('POST', 'recipes', meal)

      meal.ingredients.forEach((ingredient) => {
        const matchingIngredient = this.ingredients.find(
          (i: any) => i.name === ingredient.name
        )

        if (!matchingIngredient) {
          this.addIngredients(ingredient)
        }
      })

      this.recipes.push(meal)

      return true
    },
    async getRecipes(): Promise<Meal[] | boolean> {
      const res: any = await api('GET', 'recipes')

      this.recipes = res
      return res
    },
    async editRecipe(meal: Meal): Promise<boolean> {
      const res: any = await api('PUT', 'recipes', meal)

      //   context.commit('editRecipe', meal)
      return true
    },
    async delRecipe(recipe: Meal): Promise<boolean> {
      const res: any = await api('DEL', 'recipes', recipe.id)

      this.recipes.splice(this.recipes.indexOf(recipe), 1)

      return true
    },
  },
  persist: true,
})
