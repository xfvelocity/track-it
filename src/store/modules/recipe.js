export default {
  state: {
    recipes: [],
  },
  mutations: {
    setRecipe(state, payload) {
      state.recipes.push(payload)
    },
  },
  actions: {},
  modules: {},
}
