<template>
  <v-container>
    <v-card-title class="text-h5 justify-center bold mb-2">
      <v-icon class="primary--text me-2" size="30">mdi-trending-up</v-icon>
      <span class="primary--text">Trending Topics</span>
    </v-card-title>
    <v-row>
      <v-col cols="12">
        <!-- Trending Topics Section -->
        <v-card
          rounded="xl"
          class="pa-4 mb-4"
          elevation="3"
          style="background-color: #f5f5f5"
        >
          <div class="mt-4">
            <!-- Loop through each trend -->
            <div
              v-for="trend in trends"
              :key="trend.id"
              class="mb-4"
              @click="viewTrend(trend.search)"
              style="cursor: pointer"
            >
              <v-row dense align="center">
                <!-- Topic Name and Tweet Volume -->
                <v-col cols="8">
                  <div class="text-h6">{{ trend.name }}</div>
                  <div class="text-body-2">
                    {{
                      trend.tweet_volume
                        ? `${trend.tweet_volume} posts`
                        : "Trending Now"
                    }}
                  </div>
                </v-col>
                <!-- Button aligned to the right -->
                <v-col cols="4" class="d-flex justify-end">
                  <v-btn
                    icon
                    color="primary"
                    @click="viewTrend(trend.search)"
                    size="30"
                  >
                    <v-icon large>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- Divider between trends -->
              <v-divider
                class="mt-4"
                v-if="trend.id !== trends[trends.length - 1].id"
              ></v-divider>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { trends } from "@/resources/web-constants.js";

export default {
  name: "TrendingPage",
  data() {
    return {
      trends: trends,
      posts: [],
    };
  },
  mounted() {},
  methods: {
    // View trend details
    viewTrend(query) {
      this.$router.push({ name: "Feed", query: { q: query } });
    },
  },
};
</script>

<style scoped>
.v-card:not(:last-child) {
  margin-bottom: 1rem;
}
.v-card-title {
  display: flex;
  align-items: center;
}
.secondary--text {
  color: #6c757d;
}
.v-avatar span {
  font-size: 14px;
}
</style>
