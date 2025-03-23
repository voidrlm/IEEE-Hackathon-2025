<template>
  <v-app>
    <appBar v-if="showNavAppBar" />
    <navBar v-if="showNavAppBar" />
    <v-main>
      <router-view />
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import snackbar from "./components/alerts/snackbar.vue";
import appBar from "./components/misc/appBar.vue";
import navBar from "./components/misc/navBar.vue";
import { setCurrentUser } from "./services/auth";
export default {
  name: "App",
  components: { navBar, appBar, snackbar },
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
