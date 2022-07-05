import api, { queryApi } from '@/api/api'
import { mealPlanBase } from '@/views/meal-plan/data/mealPlan.data'
import { Meal, MealPlan } from '@/views/meal-plan/types/mealPlan.types'
import { defineStore } from 'pinia'

export const useMealStore = defineStore('meals', {
  state: (): any => ({
    recipes: [],
    mealPlan: mealPlanBase,
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

      if (!res || res?.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured adding meal, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      return true
    },
    async addIngredients(ingredient: any): Promise<void> {
      await api('POST', 'ingredients', ingredient)
    },
    async getIngredients(context: any): Promise<void> {
      const res = await api('GET', 'ingredients')

      this.ingredients = res

      if (!res || res?.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured getting ingredients, please try again.`,
        //   isVisible: true,
        // })
      }
    },
    async getMeals(date: string): Promise<MealPlan | boolean> {
      const res: any = await queryApi(
        'meals',
        {
          where: 'date',
          operator: '==',
          value: date,
        },
        'setCurrentMealPlan'
      )

      if (this.mealPlan.date !== date) {
        this.mealPlan.date = date
      }

      const todaysDate: Date = new Date()
      //   context.commit('setRecipeLastUpdated', todaysDate)

      if (!res || res?.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured getting meals, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      return res
    },
    async delMeal(
      meal: Meal,
      mealPlan: MealPlan,
      time: 'breakfast' | 'lunch' | 'dinner'
    ): Promise<boolean> {
      const matchingIndex: number = mealPlan[time].indexOf(meal)
      mealPlan[time].splice(matchingIndex, 1)

      const res: any = await api('PUT', 'meals', mealPlan)

      if (!res || res.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured deleting meal, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      return true
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

      if (!res || res.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured adding recipe, please try again.`,
        //   isVisible: true,
        // })
        return false
      }

      //   context.commit('setRecipe', meal)
      return true
    },
    async getRecipes(): Promise<Meal[] | boolean> {
      const res: any = await api('GET', 'recipes')

      if (!res || res.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured getting recipes, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      //   context.commit('setRecipe', res)
      return res
    },
    async editRecipe(meal: Meal): Promise<boolean> {
      const res: any = await api('PUT', 'recipes', meal)

      if (!res || res.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured updating recipe, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      //   context.commit('editRecipe', meal)
      return true
    },
    async delRecipe(recipe: Meal): Promise<boolean> {
      const res: any = await api('DEL', 'recipes', recipe.id)

      if (!res || res.error) {
        // context.commit('setSnackbar', {
        //   color: 'red',
        //   text: `An error occured deleting recipe, please try again.`,
        //   isVisible: true,
        // })

        return false
      }

      this.recipes.splice(this.recipes.indexOf(recipe), 1)

      return true
    },
  },
  persist: true,
})
