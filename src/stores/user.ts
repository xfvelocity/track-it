import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): any => ({
    user: {},
    nutrientGoals: {
      calories: 1800,
      protein: 160,
      carbs: 135,
      fat: 70,
    },
  }),
  persist: true,
})
