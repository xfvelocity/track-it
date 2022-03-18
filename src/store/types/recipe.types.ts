import { Meal } from '@/views/meal-prep/add-meal/create-meal/types/CreateMeal.types'

export type EditingMeal = {
  meal: Meal
  currentScreen: number
  editing: boolean
}

export type RecipeState = {
  recipes: Meal[]
  editingMeal: EditingMeal
}
