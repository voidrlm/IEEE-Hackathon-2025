<template>
  <v-overlay
    v-model="loading"
    persistent
    contained
    class="align-center justify-center"
    scrim="#8e8e8e"
    ><v-progress-circular
      width="8"
      size="50"
      indeterminate
      color="primary"
    ></v-progress-circular
  ></v-overlay>
</template>

<script>
export default {
  name: "LoadingIndicator",
  data: () => ({ loading: true }),
  props: {},

  methods: {},
};
</script>
