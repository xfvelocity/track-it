import { Meal } from '../types/CreateMeal.types'

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
