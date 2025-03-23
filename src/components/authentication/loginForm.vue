<template>
  <v-form ref="form">
    <v-card-text>
      <p class="semibold text-start mb-2">User Name *</p>
      <v-text-field
        density="compact"
        v-model="userId"
        :rules="[$validations.validClarkUEmail]"
        variant="solo-filled"
        flat
        single-line
        prepend-inner-icon="mdi-account"
        autocomplete="username"
        :readonly="isApiExecuting"
      >
      </v-text-field>
      <p class="semibold text-start my-2">Password *</p>
      <v-text-field
        density="compact"
        flat
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        variant="solo-filled"
        single-line
        autocomplete="current-password"
        prepend-inner-icon="mdi-key"
        @click:append-inner="showPassword = !showPassword"
        :rules="[$validations.required, $validations.minLength]"
        :readonly="isApiExecuting"
      >
      </v-text-field>
      <div class="text-center my-4">
        <v-btn
          variant="tonal"
          height="36px"
          density="comfortable"
          block
          class="rounded-lg bg-primary"
          @click="save"
          :loading="isApiExecuting"
        >
          Submit
        </v-btn>
      </div>
    </v-card-text>
  </v-form>
</template>
<script>
export default {
  name: "loginForm",
  data: () => ({
    userId: "",
    password: "",
    showPassword: false,
    isApiExecuting: false,
  }),
  methods: {
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.isApiExecuting = true;
        // TODO
        // var response = await apiRequestHandler("login", {
        //   username: this.userId,
        //   password: this.password,
        // });
        //if (response.success) {
        //await this.$store.dispatch("setUser", response.data);
        this.$router.push({ name: "Dashboard" });
        // }
        // this.$store.dispatch("showSnackbar", {
        //   show: true,
        //   text: response.success
        //     ? "Successfully logged in!"
        //     : response.errorMessage.message,
        //   color: response.status,
        // });

        this.isApiExecuting = false;
      }
    },
  },
};
</script>
