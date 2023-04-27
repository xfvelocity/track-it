import { defineStore } from 'pinia'
import { ConfigState } from './types/config.types'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    loading: false,
    snackbar: {
      color: '',
      text: '',
      isVisible: false,
    },
    error: {},
  }),
  persist: true,
})
