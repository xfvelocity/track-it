import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): any => ({
    user: {},
    nutrientGoals: {
      calories: 2800,
      protein: 190,
      carbs: 300,
      fat: 95,
    },
  }),
})
