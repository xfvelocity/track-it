import '@mdi/font/css/materialdesignicons.css'
import '@vuetify/nightly/lib/styles/main.sass'
import { createVuetify } from '@vuetify/nightly'
import * as components from '@vuetify/nightly/lib/components/index'
import * as directives from '@vuetify/nightly/lib/directives/index'

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#008EF5',
          background: '#35495e',
          error: '#a32223',
          info: '#0984e3',
          secondary: '#fdcb6e',
          success: '#00a62c',
          surface: '#6c5ce7',
          warning: '#2d3436',
          white: '#fff',
        },
        dark: false,
        variables: {},
      },
      dark: {
        colors: {
          primary: '#008EF5',
          background: '#35495e',
          error: '#a32223',
          info: '#0984e3',
          secondary: '#fdcb6e',
          success: '#00a62c',
          surface: '#6c5ce7',
          warning: '#2d3436',
          white: '#fff',
        },
        dark: true,
        variables: {},
      },
    },
  },
})
