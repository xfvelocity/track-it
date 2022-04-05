import { Snackbar } from '@/components/snackbar/types/Snackbar.types'
import { MealNutrients } from '@/views/meal-plan/types/mealPlan.types'
import { User } from 'firebase/auth'

export type ConfigState = {
  loading: boolean
  snackbar: Snackbar
  currentUser: User
  userData: UserData
}

export type UserData = {
  nutrientGoals: MealNutrients
}
