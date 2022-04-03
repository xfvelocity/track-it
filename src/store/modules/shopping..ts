import {
  ShoppingDateRange,
  ShoppingItem,
  ShoppingState,
} from '../types/shopping.types'

export default {
  state: {
    shopping: [
      {
        unit: 'g',
        amount: 20,
        name: 'Protein powder',
        selected: false,
      },
    ],
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
      state.shopping = payload
    },
    setRange(state: ShoppingState, payload: ShoppingDateRange): void {
      state.range = payload
    },
  },
  actions: {},
  modules: {},
}
