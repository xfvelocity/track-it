export type Meal = {
  id?: number
  name: string
  img: string
  nutrients: MealNutrients
  ingredients: MealIngredientss[]
  instructions: string[]
}

export type MealIngredientss = {
  amount: number | null
  unit: string
  name: string
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
}
