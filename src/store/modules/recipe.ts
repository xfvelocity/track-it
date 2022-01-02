import { Recipe } from '@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types'
import api from '../../api/api'
import { RecipeState } from '../types/recipe.types'

export default {
  state: {
    recipes: [],
    editingMeal: null
  },
  mutations: {
    setRecipe(state: RecipeState, payload: Recipe | Recipe[]): void {
      if (Array.isArray(payload) && payload.length > 0) state.recipes = payload
      else state.recipes.push(payload as Recipe)
    },
    setEditingMeal(state: RecipeState, payload: Recipe): void {
      state.editingMeal = payload;
    },
    editRecipe(state: RecipeState, payload: Recipe): void {
      // const matchingRecipe: number = state.recipes.findIndex(x => x._id === payload._id)
      // if (matchingRecipe) state.recipes[matchingRecipe] = payload
    },
    removeSelectedRecipe(state: RecipeState, payload: number): void {
      state.recipes.splice(payload, 1)
    }
  },
  actions: {
    async addRecipe(context: any, payload: Recipe): Promise<boolean> {
      const res = await api('POST', 'recipes', payload)

      if (res) {
        context.commit('setRecipe', payload)
        return true
      }

      context.commit('setSnackbar', {
        color: 'red',
        text: `An error occured adding recipe, please try again.`,
        isVisible: true
      })
      return false;


    },
    async getRecipes(context: any): Promise<Recipe[]> {
      const res: Recipe[] = await api('GET', 'recipes');
      context.commit('setRecipe', res)

      return res;
    },
    async editRecipe(context: any, payload: Recipe): Promise<void> {
      console.log('not implemented');
      // await api('PUT', `/meal/recipes/${payload.key}`, payload);
      // context.commit('editRecipe', payload)
    },
    async delRecipe(context: any, payload: Recipe): Promise<void> {
      const res = await api('DEL', "recipes", payload.id);
      if (res) context.commit('removeSelectedRecipe', context.state.recipes.indexOf(payload))
    }
  },
  modules: {},
}
