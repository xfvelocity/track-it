export default {
  state: {
    loading: false,
    snackbar: {
      color: '',
      text: '',
      isVisible: false
    }
  },
  mutations: {
    setLoading(state: any, payload: boolean) {
      state.loading = payload
    },
    setSnackbar(state: any, payload: any) {
      state.snackbar = payload;
    },
    setSnackbarVisibility(state: any, payload: boolean) {
      state.snackbar.isVisible = payload
    }
  },
  actions: {},
  modules: {},
}
