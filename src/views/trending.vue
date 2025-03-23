<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <!-- Trending Topics Section -->
        <v-card rounded="xl" class="pa-4 mb-4" elevation="3">
          <v-card-title class="text-h5 d-flex align-center">
            <span>Trending Topics</span>
          </v-card-title>
          <v-list dense>
            <v-list-item v-for="trend in trends" :key="trend.id">
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ trend.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-body-2 secondary--text">
                  {{
                    trend.tweet_volume
                      ? `${trend.tweet_volume} Tweets`
                      : "Trending Now"
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn icon @click="viewTrend(trend.query)">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Recent Posts Section -->
        <v-card rounded="xl" class="pa-4 mb-4" elevation="3">
          <v-card-title class="text-h5 d-flex align-center">
            <span>Recent Posts</span>
          </v-card-title>
          <div v-for="post in posts" :key="post.id" class="mb-3">
            <div class="d-flex align-center mb-2">
              <v-avatar size="36" class="mr-3" :color="'primary'">
                <span>{{ post.user_initials }}</span>
              </v-avatar>
              <span class="font-weight-bold">{{ post.username }}</span>
            </div>
            <p class="text-body-1">{{ post.content }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "TwitterTrendingPage",
  data() {
    return {
      trends: [],
      posts: [],
    };
  },
  mounted() {
    this.fetchTrends();
    this.fetchPosts();
  },
  methods: {
    // Fetch mock trending topics
    async fetchTrends() {
      this.trends = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `#Topic${index + 1}`,
        query: `%23Topic${index + 1}`,
        tweet_volume: Math.floor(Math.random() * 100000),
      }));
    },
    // Fetch mock recent posts
    async fetchPosts() {
      this.posts = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        username: `User${index + 1}`,
        user_initials: `U${index + 1}`,
        content: `This is a sample tweet content for post ${index + 1}.`,
      }));
    },
    // View trend details
    viewTrend(query) {
      window.open(`https://twitter.com/search?q=${query}`, "_blank");
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
