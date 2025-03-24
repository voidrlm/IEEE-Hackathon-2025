import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#2A004E",
          primary: "#BB86FC",
          secondary: "#03DAC6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
      light: {
        dark: false,
        colors: {
          background: "#eae9e9",
          surface: "#FFFFFF",
          primary: "#c00",
          secondary: "#03DAC6",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});
