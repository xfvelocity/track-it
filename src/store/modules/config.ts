import { Snackbar } from "@/components/snackbar/types/Snackbar.types";
import { ConfigState } from "../types/config.types";

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
    setLoading(state: ConfigState, payload: boolean): void {
      state.loading = payload
    },
    setSnackbar(state: ConfigState, payload: Snackbar): void {
      state.snackbar = payload;
    },
    setSnackbarVisibility(state: ConfigState, payload: boolean): void {
      state.snackbar.isVisible = payload
    }
  },
  actions: {},
  modules: {},
}
