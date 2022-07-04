import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: (): any => ({
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
  }),
})
