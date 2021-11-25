// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#008EF5",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#008EF5",
        },
      },
    },
  },
});
