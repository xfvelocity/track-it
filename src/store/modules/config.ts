import { Snackbar } from '@/components/snackbar/types/Snackbar.types'
import { User } from 'firebase/auth'
import { ConfigState, UserData } from '../types/config.types'

export default {
  state: {
    currentUser: {},
    userData: {
      nutrientGoals: {
        calories: 2500,
        protein: 156,
        carbs: 281,
        fat: 83,
      },
    },
    loading: false,
    snackbar: {
      color: '',
      text: '',
      isVisible: false,
    },
  },
  getters: {
    getUser(state: ConfigState): User {
      return state.currentUser
    },
    getUserUID(state: ConfigState): string {
      return state.currentUser.uid
    },
    getUserData(state: ConfigState): UserData {
      return state.userData
    },
  },
  mutations: {
    setUser(state: ConfigState, payload: User): void {
      state.currentUser = payload
    },
    setLoading(state: ConfigState, payload: boolean): void {
      state.loading = payload
    },
    setSnackbar(state: ConfigState, payload: Snackbar): void {
      state.snackbar = payload
    },
    setSnackbarVisibility(state: ConfigState, payload: boolean): void {
      state.snackbar.isVisible = payload
    },
  },
  actions: {},
  modules: {},
}
