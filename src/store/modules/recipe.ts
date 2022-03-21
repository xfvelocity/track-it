import { Meal } from '@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types'
import api, { queryApi } from '../../api/api'
import { RecipeState } from '../types/recipe.types'

export default {
  state: {
    recipes: [],
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
  },
  actions: {
    async addMeal(
      context: any,
      payload: { date: string; time: string; meal: Meal }
    ): Promise<boolean> {
      const test: any = {
        breakfast: [],
        lunch: [],
        dinner: [],
        date: payload.date,
      }

      test[payload.time].push(payload.meal)

      const res: any = await api('POST', 'meals', test)

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured adding meal, please try again.`,
          isVisible: true,
        })

        return false
      }

      // context.commit('setRecipe', payload)
      return true
    },
    async getMeals(context: any, date: string): Promise<any[] | boolean> {
      const res: any = await queryApi('meals', {
        where: 'date',
        operator: '==',
        value: date,
      })

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting meals, please try again.`,
          isVisible: true,
        })

        return false
      }

      // context.commit('setRecipe', res)
      return res
    },
    async addRecipe(context: any, payload: Meal): Promise<boolean> {
      const res: any = await api('POST', 'recipes', payload)

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
