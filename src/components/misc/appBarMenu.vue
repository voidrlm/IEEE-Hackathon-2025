<template>
  <v-menu
    offset="0 10"
    :close-on-content-click="false"
    content-class="rounded-lg"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-3 semibold text-black"
        color="primary"
        rounded="xl"
        variant="outlined"
        style="background-color: #2a5bee17"
      >
        <v-avatar
          size="25"
          :color="getMonogramColor(user.name)"
          class="mr-2 ml-n2 text-white semibold"
          style="font-size: 10px"
          >{{ getMonoGramText(user.name) }}</v-avatar
        >
        <p class="bold" style="font-size: 12px">
          {{ user.name || "" }}
        </p>
        <v-icon right size="20">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card width="300" class="bg-secondary">
      <v-list lines="two">
        <v-list-item class="pa-4">
          <template #prepend>
            <v-avatar
              size="40"
              :color="getMonogramColor(user.name)"
              class="semibold text-white"
              style="font-size: 15px"
              >{{ getMonoGramText(user.name) }}</v-avatar
            >
          </template>
          <template #title>
            <p class="bold" style="font-size: 18px">
              {{ user.name || "" }}
              <v-icon v-if="user.name" color="green" size="10"
                >mdi-circle</v-icon
              >
            </p>
          </template>
          <template #subtitle>
            <span class="text-black medium text-caption">
              {{ user.email || user.phone }}</span
            >
          </template>
        </v-list-item>

        <v-divider></v-divider>
        <v-btn
          block
          class="semibold text-caption mb-n2"
          variant="flat"
          @click="logout"
        >
          <v-icon size="18" start>mdi-logout-variant</v-icon>
          LOGOUT
        </v-btn>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { getMonoGramText, getMonogramColor } from "@/utilities/formatters";
import { logout } from "@/services/auth";
export default {
  name: "AppBarMenu",
  data() {
    return {
      getMonoGramText,
      getMonogramColor,
      user: this.$store.getters.currentUser,
    };
  },
  components: {},
  methods: {
    logout() {
      logout();
    },
  },
};
</script>
