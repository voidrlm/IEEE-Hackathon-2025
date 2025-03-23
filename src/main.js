import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles"; // Global CSS has to be imported
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Vuetify imports
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import vuetifyConfig from "./plugins/vuetify";
import ValidationPlugin from "./validators/validation-plugin";
// Global Styles
import "./scss/global.scss";
// Vue Router
import router from "./router";

// Vuex
import store from "./store";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(vuetifyConfig)
  .use(router)
  .use(store)
  .use(ValidationPlugin)
  .mount("#app");
