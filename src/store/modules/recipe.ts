import { Recipe } from '@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types'
import api from '../../api/api'
import { RecipeState } from '../types/recipe.types'

export default {
  state: {
    recipes: [],
  },
  mutations: {
    setRecipe(state: RecipeState, payload: Recipe | Recipe[]): void {
      if (Array.isArray(payload) && payload.length > 0) state.recipes = payload
      else state.recipes.push(payload as Recipe)
    },
  },
  actions: {
    async addRecipe(context: any, payload: Recipe): Promise<void> {
      const res = await api('POST', '/meal/recipes', payload)

      if (res)
        context.commit('setRecipe', payload)

    },
    async getRecipes(context: any): Promise<void> {
      const res = await api('GET', '/meal/recipes');
      context.commit('setRecipe', res)
    }
  },
  modules: {},
}
