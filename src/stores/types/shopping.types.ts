import { MealIngredients } from '@/views/meal-plan/types/mealPlan.types'

export type ShoppingState = {
  shopping: ShoppingItem[]
  date: string
  lastUpdated: Date
}

export type ShoppingDateRange = {
  start: string
  end: string
}

export interface ShoppingItem extends MealIngredients {
  selected: boolean
}
