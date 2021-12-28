import { Recipe } from '@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types'
import api from '../../api/api'
import { RecipeState } from '../types/recipe.types'

export default {
  state: {
    recipes: [],
  },
  mutations: {
    setRecipe(state: RecipeState, payload: Recipe) {
      state.recipes.push(payload)
    },
  },
  actions: {
    async addRecipe(context: any, payload: Recipe) {
      const res = await api('POST', '/meal/recipes', payload)

      if (res) {
        context.commit('setRecipe', payload)
      }
    },
  },
  modules: {},
}
