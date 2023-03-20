import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): any => ({
    user: {},
    nutrientGoals: {
      calories: 2400,
      protein: 180,
      carbs: 240,
      fat: 80,
    },
  }),
  persist: true,
})
