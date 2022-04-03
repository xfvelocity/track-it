import { MealIngredients } from '@/views/meal-plan/types/mealPlan.types'

export type ShoppingState = {
  shopping: ShoppingItem[]
  range: ShoppingDateRange
}

export type ShoppingDateRange = {
  start: string
  end: string
}

export interface ShoppingItem extends MealIngredients {
  selected: boolean
}
