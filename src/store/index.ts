import { createStore } from 'vuex'
import recipe from './modules/recipe'
import config from './modules/config'
import shopping from './modules/shopping.'

const store = createStore({
  modules: {
    recipe,
    config,
    shopping,
  },
  mutations: {
    initialiseStore(state: any): void {
      if (localStorage.getItem('store'))
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')!))
        )
    },
  },
})

store.subscribe((mutation: any, state: any): void => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
