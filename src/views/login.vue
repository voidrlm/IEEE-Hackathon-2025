<template>
  <v-row :style="'height: 100%'" no-gutters>
    <heroPane v-if="!$vuetify.display.xs" />
    <v-col cols="12" sm="6" class="d-flex align-center justify-center">
      <v-card width="400px" class="rounded-xl pa-5" elevation="20">
        <v-toolbar
          v-if="$vuetify.display.xs"
          density="compact"
          class="bg-background mb-5 rounded-xl"
        >
          <v-img
            src="https://avatars.githubusercontent.com/u/117543015?v=4"
            alt="Sample"
            width="200"
        /></v-toolbar>
        <v-card-title class="text-h4 text-start text-primary semibold"
          >Login</v-card-title
        >
        <loginForm />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import heroPane from "@/components/authentication/heroPane.vue";
import loginForm from "@/components/authentication/loginForm.vue";
export default {
  name: "LoginView",
  components: { loginForm, heroPane },
  methods: {
    openMarketingSite: function () {
      window.open("https://github.com/voidrlm", "_self");
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh !important;
}

.content {
  height: 100vh;
}
</style>
