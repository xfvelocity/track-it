export interface Snackbar {
  color: string
  text: string
  isVisible: boolean
}

export type ConfigState = {
  loading: boolean
  snackbar: Snackbar
  error: any
}
