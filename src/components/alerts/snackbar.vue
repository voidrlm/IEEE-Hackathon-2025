<template>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="3000"
    :color="snackbar.color"
    rounded="lg"
    @update:modelValue="closeSnackbar"
  >
    <v-icon start>mdi-information-outline</v-icon> {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn color="white" icon size="small" @click="snackbar.show = false">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "snackBar",
  computed: {
    ...mapGetters({
      snackbar: "snackbar",
    }),
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("showSnackbar", {
        show: false,
        ...this.snackbar,
      });
    },
  },
};
</script>
