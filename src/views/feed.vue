<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          variant="solo"
          density="compact"
          clearable
          rounded
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedCategory"
          label="Select a category"
          :items="categories"
          variant="solo"
          density="compact"
          class="mb-4"
          rounded
          clearable
          prepend-inner-icon="mdi-filter"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card
          rounded="xl"
          class="pa-4 mb-4"
          elevation="3"
          v-for="thread in filteredThreads"
          :key="thread.id"
        >
          <!-- Thread Header -->
          <v-card-title class="text-h5 d-flex align-center">
            <v-avatar size="36" class="mr-3" :color="thread.flair.color">
              <v-icon size="24">{{ thread.flair.icon }}</v-icon>
            </v-avatar>
            <span>{{ thread.title }}</span>
            <v-spacer />
            <!-- Voting Buttons -->
            <v-btn icon small @click="voteThread(thread.id, 1)">
              <v-icon small color="green">mdi-arrow-up-bold</v-icon>
            </v-btn>
            <span class="text-caption font-weight-bold text-primary">{{
              thread.score
            }}</span>
            <v-btn icon small @click="voteThread(thread.id, -1)">
              <v-icon small color="red">mdi-arrow-down-bold</v-icon>
            </v-btn>
          </v-card-title>

          <!-- Thread Metadata -->
          <v-card-subtitle class="text-body-2 secondary--text">
            {{ thread.category }} • Posted by
            <span class="font-weight-medium">{{ thread.author }}</span> •
            {{ formatDate(thread.created_utc) }}
          </v-card-subtitle>

          <!-- Thread Content -->
          <v-card-text v-if="thread.content" class="text-body-1 mb-3">
            {{ thread.content }}
          </v-card-text>

          <!-- Thread Image -->
          <v-img
            v-if="thread.image"
            :src="thread.image"
            alt="Thread Image"
            height="300"
            class="mb-3 rounded"
            style="object-fit: cover"
          ></v-img>

          <!-- Thread Video -->
          <v-responsive v-if="thread.video" class="mb-3">
            <video controls :src="thread.video" class="w-100">
              Your browser does not support the video tag.
            </video>
          </v-responsive>

          <!-- Comments Section -->
          <v-card-subtitle class="text-h6">Comments</v-card-subtitle>
          <div
            v-for="comment in thread.comments"
            :key="comment.id"
            class="mb-4"
          >
            <div class="d-flex align-center">
              <v-avatar size="24" class="mr-3">{{
                comment.user.charAt(0)
              }}</v-avatar>
              <div>
                <span class="font-weight-bold">{{ comment.user }}</span>
                <span class="text-caption">{{ comment.timestamp }}</span>
              </div>
            </div>
            <v-card-text>{{ comment.text }}</v-card-text>
            <v-btn icon small @click="replyToComment(thread.id, comment.id)">
              <v-icon small>mdi-reply</v-icon>
            </v-btn>

            <!-- Nested Replies -->
            <div v-if="comment.replies.length" class="pl-5">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="d-flex align-center"
              >
                <v-avatar size="24" class="mr-3">{{
                  reply.user.charAt(0)
                }}</v-avatar>
                <div>
                  <span class="font-weight-bold">{{ reply.user }}</span>
                  <span class="text-caption">{{ reply.timestamp }}</span>
                </div>
                <v-card-text>{{ reply.text }}</v-card-text>
              </div>
            </div>
          </div>

          <!-- Add Comment -->
          <v-textarea
            v-model="newComment[thread.id]"
            outlined
            rows="2"
            placeholder="Add a comment..."
            class="mb-3"
          ></v-textarea>
          <v-btn color="primary" small @click="addComment(thread.id)"
            >Comment</v-btn
          >
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
      threads: [],
      categories: ["Tech", "Gaming", "Music", "Sports", "Misc"],
      selectedCategory: null,
      searchQuery: "",
      newComment: {},
    };
  },
  mounted() {
    this.getThreads();
  },
  methods: {
    // Fetch mock threads
    async getThreads() {
      this.threads = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Thread Title ${index + 1}`,
        category: this.categories[index % 5],
        author: `User${index + 1}`,
        created_utc: new Date().toISOString(),
        content: `This is the content of thread ${index + 1}.`,
        score: Math.floor(Math.random() * 1000),
        image:
          index % 3 === 0
            ? `https://picsum.photos/600/300?random=${index + 1}`
            : null,
        video:
          index % 5 === 0 ? `https://www.w3schools.com/html/mov_bbb.mp4` : null,
        flair: {
          icon: "mdi-crown",
          color: "primary",
        },
        comments: [],
      }));
    },
    // Handle voting
    async voteThread(threadId, direction) {
      console.log(`Thread ID: ${threadId}, Vote Direction: ${direction}`);
    },
    // Add comment to thread
    addComment(threadId) {
      const text = this.newComment[threadId];
      if (!text || !text.trim()) {
        alert("Comment cannot be empty!");
        return;
      }
      const thread = this.threads.find((t) => t.id === threadId);
      const commentId = thread.comments.length + 1;
      thread.comments.push({
        id: commentId,
        user: "Current User",
        timestamp: new Date().toISOString(),
        text,
        replies: [],
      });
      this.newComment[threadId] = "";
    },
    // Reply to comment
    replyToComment(threadId, commentId) {
      const replyText = prompt("Enter your reply:");
      if (!replyText || !replyText.trim()) {
        alert("Reply cannot be empty!");
        return;
      }
      const thread = this.threads.find((t) => t.id === threadId);
      const comment = thread.comments.find((c) => c.id === commentId);
      if (comment) {
        const replyId = comment.replies.length + 1;
        comment.replies.push({
          id: replyId,
          user: "Current User",
          timestamp: new Date().toISOString(),
          text: replyText,
        });
      }
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
  computed: {
    filteredThreads() {
      let threads = this.threads;
      if (this.selectedCategory) {
        threads = threads.filter(
          (thread) => thread.category === this.selectedCategory
        );
      }
      if (this.searchQuery) {
        threads = threads.filter((thread) =>
          thread.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return threads;
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
.secondary--text {
  color: #6c757d;
}
.rounded {
  border-radius: 10px;
}
.w-100 {
  width: 100%;
}
</style>
