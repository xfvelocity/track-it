export type Meal = {
  id?: number
  name: string
  img: string
  nutrients: MealNutrients
  ingredients: MealIngredients[]
  instructions: string[]
}

export type MealIngredients = {
  amount: number | null
  unit: string
  name: string
  nutrients: MealNutrients
}

export type MealNutrients = {
  calories: number | null
  protein: number | null
  carbs: number | null
  fat: number | null
}

export type MealPlan = {
  breakfast: Meal[]
  lunch: Meal[]
  dinner: Meal[]
  date: string
  id?: string
}
