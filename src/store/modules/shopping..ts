import { queryApi } from '@/api/api'
import {
  ShoppingDateRange,
  ShoppingItem,
  ShoppingState,
} from '../types/shopping.types'

export default {
  state: {
    shopping: [],
    date: '',
    lastUpdated: '',
  },
  getters: {
    getShopping(state: ShoppingState): ShoppingItem[] {
      return state.shopping
    },
  },
  mutations: {
    setDate(state: ShoppingState, payload: string): void {
      state.date = payload
    },
    setShoppingLastUpdated(state: ShoppingState, payload: Date): void {
      state.lastUpdated = payload
    },
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
