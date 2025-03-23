<template>
  <v-main>
    <v-empty-state
      image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
      size="200"
      text-width="250"
    >
      <template v-slot:media>
        <v-img class="mb-8"></v-img>
      </template>

      <template v-slot:title>
        <div class="text-h2 bold text-high-emphasis">Page not found</div>
      </template>

      <template v-slot:text>
        <div class="text-body-1 semibold">
          The page you were looking for does not exist
        </div>
      </template>
    </v-empty-state>
  </v-main>
</template>
<script>
export default {
  name: "NotFoundPage",
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
