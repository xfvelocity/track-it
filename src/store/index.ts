import { createStore } from 'vuex'
import recipe from './modules/recipe'
import config from './modules/config'

const store = createStore({
  modules: {
    recipe,
    config
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('store'))
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')!))
        )
    },
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
