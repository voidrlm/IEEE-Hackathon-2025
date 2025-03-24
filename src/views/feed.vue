<template>
  <v-container>
    <v-row class="mt-4">
      <!-- Search Bar -->
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
      <!-- Category Dropdown -->
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedCategory"
          label="Filter by Category"
          :items="uniqueCategories"
          variant="solo"
          density="compact"
          rounded
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <!-- Threads -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card
          v-for="thread in filteredThreads"
          :key="thread.id"
          class="mb-4 pa-4 rounded-xl shadow-sm"
        >
          <!-- Thread Header -->
          <div class="d-flex align-center mb-3">
            <v-avatar size="40" class="mr-3"
              ><v-icon>{{ thread.flair.icon }}</v-icon></v-avatar
            >
            <div>
              <h3>{{ thread.title }}</h3>
              <small
                >Posted by {{ thread.author }} •
                {{ formatDate(thread.created_utc) }}</small
              >
            </div>
            <v-spacer />
          </div>

          <!-- Thread Content -->
          <p>{{ thread.content }}</p>

          <!-- Image/Video Content -->
          <v-img
            v-if="thread.image"
            :src="thread.image"
            height="300px"
            class="rounded mb-3"
          ></v-img>
          <video v-if="thread.video" controls class="w-100 mb-3">
            <source :src="thread.video" type="video/mp4" />
            Your browser does not support video playback.
          </video>

          <!-- Voting & Comment Button -->
          <div class="d-flex align-center mb-3">
            <v-btn icon small @click="voteThread(thread.id, 1)">
              <v-icon color="green">mdi-arrow-up-bold</v-icon>
            </v-btn>
            <span class="mx-2">{{ thread.score }}</span>
            <v-btn icon small @click="voteThread(thread.id, -1)">
              <v-icon color="red">mdi-arrow-down-bold</v-icon>
            </v-btn>

            <!-- Comment Button -->
            <v-btn icon small @click="toggleComments(thread.id)">
              <v-icon>mdi-comment</v-icon>
            </v-btn>
          </div>

          <!-- Comments Section -->
          <div v-if="thread.showComments">
            <v-card-subtitle class="text-h6">Comments</v-card-subtitle>
            <v-divider class="mb-4"></v-divider>
            <div
              v-for="comment in thread.comments"
              :key="comment.id"
              class="mb-4"
            >
              <div class="d-flex align-start mb-3">
                <v-avatar size="40" class="mr-3" color="primary">{{
                  comment.user.charAt(0)
                }}</v-avatar>
                <div>
                  <p class="font-weight-bold mb-1">{{ comment.user }}</p>
                  <p class="text-caption text-muted mb-2">
                    {{ formatDate(comment.timestamp) }}
                  </p>
                  <p>{{ comment.text }}</p>
                  <div class="d-flex align-center mt-2">
                    <v-btn
                      icon
                      small
                      @click="replyToComment(thread.id, comment.id)"
                    >
                      <v-icon small>mdi-reply</v-icon>
                    </v-btn>
                    <span class="text-caption ml-2">Reply</span>
                  </div>
                </div>
              </div>

              <!-- Nested Replies -->
              <div v-if="comment.replies.length" class="pl-5 mt-3">
                <div
                  v-for="reply in comment.replies"
                  :key="'reply-' + reply.id"
                  class="d-flex align-start mb-3"
                >
                  <v-avatar size="32" class="mr-3" color="secondary">{{
                    reply.user.charAt(0)
                  }}</v-avatar>
                  <div>
                    <p class="font-weight-bold mb-1">{{ reply.user }}</p>
                    <p class="text-caption text-muted mb-2">
                      {{ formatDate(reply.timestamp) }}
                    </p>
                    <p>{{ reply.text }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Comment Input -->
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
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { threads } from "@/resources/web-constants";

export default {
  name: "FeedView",
  data() {
    return {
      threads: threads.map((t) => ({ ...t, showComments: false })), // Add showComments flag
      selectedCategory: null,
      searchQuery: "",
      newComment: {},
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.q) {
      this.searchQuery = query.q;
    }
  },
  methods: {
    async voteThread(threadId, direction) {
      console.log(`Thread ID: ${threadId}, Vote Direction: ${direction}`);
    },
    toggleComments(threadId) {
      const thread = this.threads.find((t) => t.id === threadId);
      if (thread) {
        thread.showComments = !thread.showComments;
      }
    },
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
    uniqueCategories() {
      const categories = this.threads.map((thread) => thread.category);
      return [...new Set(categories)];
    },
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
