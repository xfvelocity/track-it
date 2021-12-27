export default {
  state: {
    recipes: [],
  },
  mutations: {
    setRecipe(state: any, payload: any[]) {
      state.recipes.push(payload)
    },
  },
  actions: {
    // addRecipe() {
    //   axios
    //     .post(`${import.meta.env.VITE_API_URL}/meal/recipes`, meal.value)
    //     .then(() => {})
    // },
  },
  modules: {},
}
