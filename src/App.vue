<template>
  <v-app>
    <appBar v-if="showNavAppBar" />
    <navBar v-if="showNavAppBar" />
    <v-main>
      <router-view />
      <snackbar />
      <chatbot v-if="showNavAppBar" />
      <!-- Added chatbot component -->
    </v-main>
  </v-app>
</template>

<script>
import snackbar from "./components/alerts/snackbar.vue";
import appBar from "./components/misc/appBar.vue";
import navBar from "./components/misc/navBar.vue";
import chatbot from "./components/misc/chatbot.vue"; // Import chatbot component
import { setCurrentUser } from "./services/auth";

export default {
  name: "App",
  components: { navBar, appBar, snackbar, chatbot }, // Register chatbot
  computed: {
    showNavAppBar() {
      return this.$route.path != "/";
    },
  },
  mounted() {
    setCurrentUser();
  },
};
</script>
