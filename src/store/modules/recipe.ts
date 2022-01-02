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
      const res: any = await api('POST', 'recipes', payload)

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured adding recipe, please try again.`,
          isVisible: true
        })
        return false;
      }

      context.commit('setRecipe', payload)
      return true
    },
    async getRecipes(context: any): Promise<Recipe[] | boolean> {
      const res: any = await api('GET', 'recipes');

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting recipes, please try again.`,
          isVisible: true
        })

        return false;
      }

      context.commit('setRecipe', res)
      return res;
    },
    async editRecipe(context: any, payload: Recipe): Promise<void> {
      console.log('not implemented');
      // await api('PUT', "recipes", payload);
      // context.commit('editRecipe', payload)
    },
    async delRecipe(context: any, payload: Recipe): Promise<boolean> {
      const res: any = await api('DEL', "recipes", payload.id);

      if (!res || res.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured deleting recipe, please try again.`,
          isVisible: true
        })

        return false;
      }

      context.commit('removeSelectedRecipe', context.state.recipes.indexOf(payload))
      return true;
    }
  },
  modules: {},
}
