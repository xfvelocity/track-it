import { queryApi } from '@/api/api'
import { defineStore } from 'pinia'
import { ShoppingItem } from './types/shopping.types'

export const useShoppingStore = defineStore('shopping', {
  state: (): any => ({
    shopping: [],
    date: '',
    lastUpdated: '',
  }),
  actions: {
    setShopping(item: ShoppingItem[]): void {
      if (!item) return

      if (Array.isArray(item) && item.length === 0) {
        this.shopping = []
      } else {
        const keys: ['breakfast', 'lunch', 'dinner'] = [
          'breakfast',
          'lunch',
          'dinner',
        ]

        keys.forEach((key) =>
          item[key].forEach((item) =>
            item.ingredients.forEach((ingredient) => {
              const matchingIngredient = this.shopping.find(
                (x) => x.name === ingredient.name
              )

              if (matchingIngredient) {
                matchingIngredient.amount += ingredient.amount

                const index = this.shopping.indexOf(matchingIngredient)
                this.shopping[index] = matchingIngredient
              } else {
                this.shopping.push(ingredient)
              }
            })
          )
        )
      }
    },
    async getShoppingRecipes(date: string): Promise<any> {
      const res: any = await queryApi('meals', {
        where: 'date',
        operator: '==',
        value: date,
      })

      this.setShopping(res[0])

      return res
    },
  },
  persist: true,
})
