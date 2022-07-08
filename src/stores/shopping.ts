import { queryRangeApi } from '@/api/api'
import moment from 'moment'
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
    async getShoppingRecipes(): Promise<void> {
      this.shopping = []

      const res: any[] = await queryRangeApi(
        'meals',
        {
          where: 'date',
          operator: '>=',
          value: moment().day(0).format('YYYY-MM-DD'),
        },
        {
          where: 'date',
          operator: '<',
          value: moment().day(7).format('YYYY-MM-DD'),
        }
      )

      this.date = moment().day(0).format('YYYY-MM-DD')
      this.lastUpdated = moment().format('YYYY-MM-DD')

      res.forEach((r) => this.setShopping(r))
    },
  },
  persist: true,
})
