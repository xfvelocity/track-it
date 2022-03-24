import { Snackbar } from '@/components/snackbar/types/Snackbar.types'
import { User } from 'firebase/auth'

export type ConfigState = {
  loading: boolean
  snackbar: Snackbar
  currentUser: User
}
