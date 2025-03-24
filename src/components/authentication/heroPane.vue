<template>
  <v-col cols="12" sm="6" class="bg-primary">
    <div
      class="rounded-xl clickable"
      elevation="0"
      style="
        margin-top: 30px !important;
        margin-left: 50px !important;
        margin-right: 50px !important;
        padding: 15px !important;
        background: rgba(
          255,
          255,
          255,
          0.8
        ) !important; /* Lightened background */
      "
      @click="openSite('https://www.clarku.edu/')"
    >
      <v-row>
        <v-col cols="auto">
          <v-img
            :src="require(`@/assets/cougar.png`)"
            alt="Sample"
            width="30"
          />
        </v-col>
        <v-col align-self="center">
          <span class="bold mb-5 ml-n3 text-h5 text-primary"> ClarkVerse </span>
        </v-col>
      </v-row>
    </div>
    <div
      style="
        padding-left: 50px !important;
        padding-right: 50px !important;
        padding-top: 50px !important;
      "
    >
      <p
        class="mb-5 text-white bold"
        :class="$vuetify.display.mdAndDown ? 'text-h3' : 'text-h2'"
      >
        Welcome to ClarkVerse
      </p>
      <div
        class="pt-5 text-white semibold"
        :class="$vuetify.display.mdAndDown ? 'text-h5' : 'text-h4'"
      >
        A dedicated AI-powered digital ecosystem, enhanced by Cougar AI,
        connecting students, faculty, and alumni seamlessly
      </div>
    </div>
    <v-footer app class="bg-primary" height="30px">
      <v-row
        class="text-white py-4 ml-2"
        justify="space-between"
        align="center"
      >
        <div>
          <v-btn
            density="compact"
            icon
            size="small"
            class="mr-2"
            @click="
              openSite('https://www.facebook.com/ClarkUniversityWorcester/')
            "
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            density="compact"
            icon
            size="small"
            class="mr-2"
            @click="openSite('https://x.com/clarkuniversity')"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-footer>
  </v-col>
</template>

<script>
export default {
  name: "heroPane",
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {
    openSite: function (url) {
      window.open(url, "_self");
    },
  },
};
</script>
