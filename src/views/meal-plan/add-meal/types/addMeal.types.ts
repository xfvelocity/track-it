export interface Ingredient {
  name: string
  amount: number
  unit: string
  macros: IngredientMacros
}

export interface IngredientMacros {
  calories: number
  protein: number
  fat: number
  carbs: number
}
