import { defineStore } from 'pinia'
import { useMealStore } from './meals'
import { keys } from '@/helpers/utility'

export const useShoppingStore = defineStore('shopping', {
  state: (): any => ({
    shopping: [],
  }),
  actions: {
    setShopping(): void {
      const mealStore = useMealStore()

      this.shopping = []

      setTimeout(() => {
        keys.forEach((key) =>
          mealStore.mealPlan[key].forEach((item) =>
            item.ingredients.forEach((ingredient) => {
              const matchingIngredient = this.shopping.find(
                (x) => x.name === ingredient.name
              )

              if (matchingIngredient) {
                matchingIngredient.amount = parseInt(matchingIngredient.amount)
                matchingIngredient.amount += parseInt(ingredient.amount)

                this.shopping[this.shopping.indexOf(matchingIngredient)] =
                  matchingIngredient
              } else {
                this.shopping.push(ingredient)
              }
            })
          )
        )
      }, 100)
    },
  },
  persist: true,
})
