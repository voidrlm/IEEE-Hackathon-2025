<template>
  <v-navigation-drawer ref="navbar" rail permanent>
    <v-list nav>
      <v-list-item
        class="my-1"
        density="compact"
        v-for="(item, index) in navItems"
        :key="index"
        :prepend-icon="item.icon"
        :value="item.value"
        :class="{ selectedView: $route.name === item.title }"
        @click="navigateTo(item.title)"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { getNavItems } from "@/resources/nav-items";
export default {
  name: "NavigationDrawer",
  data() {
    return {
      navItems: getNavItems(),
    };
  },

  methods: {
    navigateTo(title) {
      this.$router.push({ name: title });
    },
  },
};
</script>

<style scoped>
.selectedView {
  background-color: #eaeaea;
}
</style>
