<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card
          class="pa-4 mb-4"
          elevation="2"
          v-for="post in posts"
          :key="post.id"
        >
          <!-- Post Header -->
          <v-card-title class="text-h5 d-flex align-center">
            <span>{{ post.title }}</span>
            <v-spacer />
            <!-- Voting Buttons -->
            <v-btn icon small @click="votePost(post.id, 1)">
              <v-icon small>mdi-arrow-up</v-icon>
            </v-btn>
            <span class="text-caption font-weight-bold">{{ post.score }}</span>
            <v-btn icon small @click="votePost(post.id, -1)">
              <v-icon small>mdi-arrow-down</v-icon>
            </v-btn>
          </v-card-title>

          <!-- Post Metadata -->
          <v-card-subtitle class="text-body-2 text-muted">
            {{ post.subreddit }} • Posted by {{ post.author }} •
            {{ formatDate(post.created_utc) }}
          </v-card-subtitle>

          <!-- Post Content -->
          <v-card-text v-if="post.selftext">{{ post.selftext }}</v-card-text>

          <!-- Post Image -->
          <v-img
            v-if="post.image"
            :src="post.image"
            alt="Post Image"
            max-height="300"
            contain
            class="mb-3"
          ></v-img>

          <!-- Post Video -->
          <div v-if="post.video" class="video-container">
            <video controls :src="post.video" class="responsive-video"></video>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FeedView",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    // Fetch mock posts
    async getPosts() {
      this.posts = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Post Title ${index + 1}`,
        subreddit: `r/Subreddit${index + 1}`,
        author: `User${index + 1}`,
        created_utc: new Date().toISOString(),
        selftext: `This is the content of post ${index + 1}.`,
        score: Math.floor(Math.random() * 1000),
        image:
          index % 3 === 0
            ? `https://picsum.photos/600/300?random=${index + 1}` // Using Lorem Picsum for random images
            : null,
        video:
          index % 5 === 0 ? `https://www.w3schools.com/html/mov_bbb.mp4` : null,
      }));
    },
    // Handle voting
    async votePost(postId, direction) {
      console.log(`Post ID: ${postId}, Vote Direction: ${direction}`);
    },
    // Format date for display
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
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
.v-btn {
  margin-left: 8px;
}
.text-muted {
  color: #6c757d;
}
.video-container {
  position: relative;
}
.responsive-video {
  width: 100%;
  height: auto;
}
</style>
