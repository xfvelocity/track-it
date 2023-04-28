import { Meal, MealNutrients, MealPlan } from '../types/mealPlan.types'

export const mealBase: Meal = {
  name: '',
  img: '',
  ingredients: [
    {
      amount: null,
      unit: 'g',
      name: '',
      nutrients: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null,
      },
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
  let day: number | string = today.getDate()

  month = month.length < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day

  return `${today.getFullYear()}-${month}-${day}`
}

export const mealPlanBase: MealPlan = {
  breakfast: [],
  lunch: [],
  dinner: [],
  date: getTodaysDate(),
}

export const creatingMealBase: any = {
  name: '',
  ingredients: [],
  macros: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
}

export const nutrientsBase: MealNutrients = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
}
