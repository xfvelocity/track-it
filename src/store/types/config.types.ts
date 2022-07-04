import { Snackbar } from '@/components/snackbar/types/Snackbar.types'
import { MealNutrients } from '@/views/meal-plan/types/mealPlan.types'
import { User } from 'firebase/auth'

export type ConfigState = {
  loading: Loading
  snackbar: Snackbar
  currentUser: User
  userData: UserData
  error: any
}

export type UserData = {
  nutrientGoals: MealNutrients
}

export type Loading = {
  type: string
  value: boolean
}
