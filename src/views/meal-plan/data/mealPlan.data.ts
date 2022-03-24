import { Meal, MealNutrients, MealPlan } from '../types/mealPlan.types'

export const mealBase: Meal = {
  name: '',
  img: '',
  ingredients: [
    {
      amount: null,
      unit: 'g',
      name: '',
    },
  ],
  instructions: [],
  nutrients: {
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
  },
}

const getTodaysDate = (): string => {
  const today: Date = new Date()
  let month: string = (today.getMonth() + 1).toString()

  if (month.length < 10) {
    month = `0${month}`
  }

  return `${today.getDate()}-${month}-${today.getFullYear()}`
}

export const mealPlanBase: MealPlan = {
  breakfast: [],
  lunch: [],
  dinner: [],
  date: getTodaysDate(),
}

export const nutrientsBase: MealNutrients = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
}
