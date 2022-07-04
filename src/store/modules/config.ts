import { Snackbar } from '@/components/snackbar/types/Snackbar.types'
import { User } from 'firebase/auth'
import { ConfigState, Loading, UserData } from '../types/config.types'

export default {
  state: {
    currentUser: {},
    userData: {
      nutrientGoals: {
        calories: 2800,
        protein: 190,
        carbs: 300,
        fat: 95,
      },
    },
    loading: {
      type: 'bar',
      value: false,
    },
    snackbar: {
      color: '',
      text: '',
      isVisible: false,
    },
    error: {},
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
    getLoading(state: ConfigState): Loading {
      return state.loading
    },
  },
  mutations: {
    setUser(state: ConfigState, payload: User): void {
      state.currentUser = payload
    },
    setLoading(state: ConfigState, payload: Loading): void {
      state.loading = payload
    },
    setLoadingValue(state: ConfigState, payload: boolean): void {
      state.loading.value = payload

      if (!payload) {
        state.loading.type = 'bar'
      }
    },
    setError(state: ConfigState, payload: any): void {
      state.error = payload
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
