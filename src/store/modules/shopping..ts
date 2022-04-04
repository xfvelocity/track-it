import { queryApi } from '@/api/api'
import {
  ShoppingDateRange,
  ShoppingItem,
  ShoppingState,
} from '../types/shopping.types'

export default {
  state: {
    shopping: [],
    range: {
      start: '2022-04-01',
      end: '2022-04-07',
    },
  },
  getters: {
    getShopping(state: ShoppingState): ShoppingItem[] {
      return state.shopping
    },
    getRange(state: ShoppingState): ShoppingDateRange {
      return state.range
    },
  },
  mutations: {
    setShopping(state: ShoppingState, payload: ShoppingItem[]): void {
      if (!payload) return

      if (Array.isArray(payload) && payload.length === 0) {
        state.shopping = []
      } else {
        const keys: ['breakfast', 'lunch', 'dinner'] = [
          'breakfast',
          'lunch',
          'dinner',
        ]

        keys.forEach((key) =>
          payload[key].forEach((item) =>
            item.ingredients.forEach((ingredient) => {
              const matchingIngredient = state.shopping.find(
                (x) => x.name === ingredient.name
              )

              if (matchingIngredient) {
                matchingIngredient.amount += ingredient.amount

                const index = state.shopping.indexOf(matchingIngredient)
                state.shopping[index] = matchingIngredient
              } else {
                state.shopping.push(ingredient)
              }
            })
          )
        )
      }
    },
    setRange(state: ShoppingState, payload: ShoppingDateRange): void {
      state.range = payload
    },
  },
  actions: {
    async getShoppingRecipes(context: any, date: string): Promise<any> {
      const res: any = await queryApi(
        'meals',
        {
          where: 'date',
          operator: '==',
          value: date,
        },
        'setShopping'
      )

      if (!res || res?.error) {
        context.commit('setSnackbar', {
          color: 'red',
          text: `An error occured getting shopping ingredients, please try again.`,
          isVisible: true,
        })

        return false
      }

      return res
    },
  },
  modules: {},
}
