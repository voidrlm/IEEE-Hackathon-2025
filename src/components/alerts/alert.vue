<template>
  <v-overlay
    v-model="alert.show"
    :z-index="9999"
    scrim="#8e8e8e"
    class="d-flex align-center justify-center"
    @update:modelValue="closeAlert"
    alert
  >
    <v-card
      elevation="3"
      max-width="400"
      outlined
      class="mx-auto rounded-xl pa-5"
    >
      <v-card-title class="text-h5 semibold text-center text-error"
        ><v-icon start size="25" class="ml-0">{{
          alert.icon || "mdi-alert"
        }}</v-icon
        >{{ alert.title }}</v-card-title
      >
      <v-card-text class="text-h6 mt-3">
        <span style="white-space: pre-wrap">{{ alert.text }}</span>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          class="yesButton mr-2"
          variant="outlined"
          @click="
            $emit('confirm', alert.data);
            alert.show = false;
          "
          >Yes</v-btn
        >
        <v-btn
          class="noButton mr-2"
          variant="outlined"
          @click="alert.show = false"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OverlayAlert",
  computed: {
    ...mapGetters({
      alert: "alert",
    }),
  },
  methods: {
    closeAlert() {
      this.$store.dispatch("showAlert", {
        show: false,
        ...this.alert,
      });
    },
  },
};
</script>
