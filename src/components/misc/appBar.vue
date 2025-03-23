<template>
  <v-app-bar app height="60" elevation="2">
    <v-img
      class="ml-2"
      max-height="55"
      max-width="150"
      :src="require(`@/assets/main-logo.svg`)"
      alt="Sample"
    />

    <v-spacer></v-spacer>
    <appBarMenu> </appBarMenu>
  </v-app-bar>
</template>

<script>
import appBarMenu from "./appBarMenu.vue";

export default {
  name: "AppBar",
  components: { appBarMenu },
  data() {
    return {};
  },
  created() {},
};
</script>
