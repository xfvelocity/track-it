import {
  Ingredient,
  IngredientMacros,
} from '@/views/meal-plan/add-meal/types/addMeal.types'

export const validationSchema = {
  email(value: string): [] | string {
    const isValid: boolean = !!value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    return isValid ? [] : 'Invalid email'
  },
  password(value: string): [] | string {
    if (value.length < 6) {
      return 'Must be at least 6 characters'
    } else if (value.search(/[a-z]/i) < 0) {
      return 'Must contain at least one letter.'
    } else if (value.search(/[0-9]/) < 0) {
      return 'Must contain at least one digit.'
    } else {
      return []
    }
  },
}

export const debounce = (func: Function, delay: number): any => {
  let timer: any

  return (...args: any[]) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export const formatIngredient = (ingredient: Ingredient): string => {
  const unit: string = ingredient.unit === 'unit' ? '' : ingredient.unit

  return `${ingredient.amount}${unit} ${ingredient.name}`
}

export const calculateMacros = (meal: any): IngredientMacros => {
  let macros: IngredientMacros = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  }

  meal.ingredients.forEach((ingredient: any) => {
    Object.keys(meal.macros).forEach((key) => {
      macros[key as keyof IngredientMacros] += parseInt(ingredient.macros[key])
    })
  })

  return macros
}
