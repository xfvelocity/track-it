import { mealPlanBase } from '@/views/meal-plan/data/mealPlan.data'
import { Meal, MealPlan } from '@/views/meal-plan/types/mealPlan.types'
import api, { queryApi } from '../../api/api'
import { RecipeState } from '../types/recipe.types'

export default {
  state: {
    recipes: [],
    mealPlan: mealPlanBase,
    ingredients: [],
  },
  mutations: {
    setRecipe(state: RecipeState, payload: Meal | Meal[]): void {
      if (Array.isArray(payload) && payload.length > 0) state.recipes = payload
      else state.recipes.push(payload as Meal)
    },
    editRecipe(state: RecipeState, payload: Meal): void {
      // const matchingRecipe: number = state.recipes.findIndex(x => x._id === payload._id)
      // if (matchingRecipe) state.recipes[matchingRecipe] = payload
    },
    removeSelectedRecipe(state: RecipeState, payload: number): void {
      state.recipes.splice(payload, 1)
    },
    setCurrentMealPlan(state: RecipeState, payload: MealPlan): void {
      if (!payload) {
        payload = mealPlanBase
        payload.date = state.mealPlan.date
      }

      state.mealPlan = payload
    },
    setIngredients(state: any, payload: any): void {
      state.ingredients = payload
    },
  },
  actions: {
    async addMeal(
      context: any,
      payload: {
        time: 'breakfast' | 'lunch' | 'dinner'
        meal: Meal
        mealPlan: MealPlan
      }
    ): Promise<boolean> {
      let res: any
      let formattedPayload: MealPlan

      payload.mealPlan[payload.time].push(payload.meal)
      formattedPayload = payload.mealPlan

      res = await api(
        payload.mealPlan.id ? 'PUT' : 'POST',
        'meals',
        formattedPayload
      )

      if (!res || res?.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured adding meal, please try again.`,
          isVisible: true,
        })

        return false
      }

      return true
    },
    async addIngredients(context: any, payload: any): Promise<void> {
      await api('POST', 'ingredients', payload)
    },
    async getIngredients(context: any): Promise<void> {
      const res = await api('GET', 'ingredients')

      await context.commit('setIngredients', res)

      if (!res || res?.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting ingredients, please try again.`,
          isVisible: true,
        })
      }
    },
    async getMeals(context: any, date: string): Promise<MealPlan | boolean> {
      const res: any = await queryApi(
        'meals',
        {
          where: 'date',
          operator: '==',
          value: date,
        },
        'setCurrentMealPlan'
      )

      if (context.state.mealPlan.date !== date) {
        context.state.mealPlan.date = date
      }

      if (!res || res?.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting meals, please try again.`,
          isVisible: true,
        })

        return false
      }

      return res
    },
    async delMeal(
      context: any,
      payload: {
        meal: Meal
        mealPlan: MealPlan
        time: 'breakfast' | 'lunch' | 'dinner'
      }
    ): Promise<boolean> {
      const matchingIndex: number = payload.mealPlan[payload.time].indexOf(
        payload.meal
      )
      payload.mealPlan[payload.time].splice(matchingIndex, 1)

      const res: any = await api('PUT', 'meals', payload.mealPlan)

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured deleting meal, please try again.`,
          isVisible: true,
        })

        return false
      }

      return true
    },
    async addRecipe(context: any, payload: Meal): Promise<boolean> {
      const res: any = await api('POST', 'recipes', payload)

      payload.ingredients.forEach((ingredient) => {
        const matchingIngredient = context.state.ingredients.find(
          (i: any) => i.name === ingredient.name
        )

        if (!matchingIngredient) {
          context.dispatch('addIngredients', ingredient)
        }
      })

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured adding recipe, please try again.`,
          isVisible: true,
        })
        return false
      }

      context.commit('setRecipe', payload)
      return true
    },
    async getRecipes(context: any): Promise<Meal[] | boolean> {
      const res: any = await api('GET', 'recipes')

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting recipes, please try again.`,
          isVisible: true,
        })

        return false
      }

      context.commit('setRecipe', res)
      return res
    },
    async editRecipe(context: any, payload: Meal): Promise<boolean> {
      const res: any = await api('PUT', 'recipes', payload)

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured updating recipe, please try again.`,
          isVisible: true,
        })

        return false
      }

      context.commit('editRecipe', payload)
      return true
    },
    async delRecipe(context: any, payload: Meal): Promise<boolean> {
      const res: any = await api('DEL', 'recipes', payload.id)

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured deleting recipe, please try again.`,
          isVisible: true,
        })

        return false
      }

      context.commit(
        'removeSelectedRecipe',
        context.state.recipes.indexOf(payload)
      )
      return true
    },
  },
  modules: {},
}
