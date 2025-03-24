<template>
  <v-container>
    <!-- New Post Dialog -->
    <v-dialog v-model="dialog" max-width="600px" content-class="rounded-xl">
      <v-card rounded="xl">
        <v-card-title>Create New Post</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newPost.title"
            label="Title"
            rounded
            variant="solo"
            density="compact"
          ></v-text-field>
          <v-textarea
            v-model="newPost.content"
            label="Content"
            rounded
            variant="solo"
            density="compact"
            rows="3"
          ></v-textarea>
          <v-select
            v-model="newPost.category"
            label="Category"
            :items="uniqueCategories"
            rounded
            variant="solo"
            density="compact"
          ></v-select>
          <v-file-input
            v-model="newPost.media"
            label="Upload Image/Video"
            rounded
            variant="solo"
            density="compact"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createPost">Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Existing Content -->
    <v-row class="mt-4">
      <!-- Search Bar -->
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="searchQuery"
          label="Search"
          clearable
          rounded
          variant="solo"
          density="compact"
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
    <!-- New Post Button -->
    <v-row class="mt-n5">
      <v-col cols="12" class="text-right">
        <v-btn
          color="primary"
          rounded
          @click="dialog = true"
          prepend-icon="mdi-plus"
          >Create New Post</v-btn
        >
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
          <div class="d-flex align-center mb-3">
            <v-avatar size="40" class="mr-3">
              <v-icon>{{ thread.flair?.icon }}</v-icon>
            </v-avatar>
            <div>
              <h3>{{ thread.title }}</h3>
              <small
                >Posted by {{ thread.author }} •
                {{ formatDate(thread.created_utc) }}</small
              >
            </div>
          </div>
          <p>{{ thread.content }}</p>
          <v-img
            v-if="thread.image"
            :src="thread.image"
            height="300px"
            class="rounded ma-3"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="primary-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div> </template
          ></v-img>
          <video v-if="thread.video" controls class="w-100 ma-3">
            <source :src="thread.video" type="video/mp4" />
          </video>

          <!-- Vote and Comment Buttons -->
          <v-row class="ml-5" dense>
            <v-btn
              icon
              size="small"
              class="mr-2"
              outlined
              @click="voteThread(thread.id, 'up')"
            >
              <v-icon small>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
              icon
              size="small"
              class="mr-2"
              outlined
              @click="voteThread(thread.id, 'down')"
            >
              <v-icon small>mdi-thumb-down</v-icon>
            </v-btn>

            <v-btn
              icon
              size="small"
              class="mr-2"
              outlined
              @click="toggleComments(thread.id)"
            >
              <v-icon small>mdi-comment</v-icon>
              <span class="text-caption ml-1">{{
                thread.comments ? thread.comments.length : 0
              }}</span>
            </v-btn>
          </v-row>

          <!-- Comments Section -->
          <v-expand-transition>
            <div v-if="thread.showComments" class="mt-3">
              <v-divider class="mb-4"></v-divider>
              <v-text-field
                v-model="newComment[thread.id]"
                label="Add a comment"
                outlined
                density="compact"
                rounded
                variant="solo"
              ></v-text-field>
              <v-btn color="primary" @click="addComment(thread.id)"
                >Post Comment</v-btn
              >
              <div
                v-for="comment in thread.comments"
                :key="comment.id"
                class="mb-4"
              >
                <v-card flat>
                  <div class="d-flex align-center pa-2">
                    <v-avatar size="36" class="mr-3" color="primary">{{
                      comment.user.charAt(0)
                    }}</v-avatar>
                    <div>
                      <span class="font-weight-bold">{{ comment.user }}</span>
                      <span class="text-caption ml-2">{{
                        formatDate(comment.timestamp)
                      }}</span>
                    </div>
                    <v-spacer />
                    <v-btn
                      icon
                      small
                      @click="replyToComment(thread.id, comment.id)"
                    >
                      <v-icon small>mdi-reply</v-icon>
                    </v-btn>
                  </div>
                  <v-divider></v-divider>
                  <v-card-text class="px-2">{{ comment.text }}</v-card-text>
                  <div
                    v-if="comment && comment.replies && comment.replies.length"
                    class="pl-4"
                  >
                    <v-divider class="my-2"></v-divider>
                    <div
                      v-for="reply in comment.replies"
                      :key="reply.id"
                      class="d-flex align-start mb-3"
                    >
                      <v-avatar size="32" class="mr-3" color="secondary">{{
                        reply.user.charAt(0)
                      }}</v-avatar>
                      <div>
                        <div>
                          <span class="font-weight-bold">{{ reply.user }}</span>
                          <span class="text-caption ml-2">{{
                            formatDate(reply.timestamp)
                          }}</span>
                        </div>
                        <v-card-text>{{ reply.text }}</v-card-text>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { threadsData } from "@/resources/web-constants";
//import { apiRequestHandler } from "@/services/rest-api-manager";

export default {
  name: "FeedView",
  data() {
    return {
      threads: threadsData.map((t) => ({ ...t, showComments: false })),
      selectedCategory: null,
      searchQuery: "",
      newComment: {},
      dialog: false,
      newPost: {
        title: "",
        content: "",
        category: "",
        media: null,
      },
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
      const thread = this.threads.find((t) => t.id === threadId);
      if (!thread) return;

      if (direction === "up") {
        thread.votes += 1; // Increment vote count for upvote
      } else if (direction === "down") {
        thread.votes -= 1; // Decrement vote count for downvote
      }
    },

    getCategoryIcon(category) {
      switch (category) {
        case "Event":
          return "mdi-calendar-multiple";
        case "Fun":
          return "mdi-emoticon-excited";
        case "Pets":
          return "mdi-dog";
        default:
          return "mdi-help-circle";
      }
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
        user: this.$store.getters.currentUser.name,
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
          user: this.$store.getters.currentUser.name,
          timestamp: new Date().toISOString(),
          text: replyText,
        });
      }
    },
    async createPost() {
      if (!this.newPost.title || !this.newPost.content) {
        this.$store.dispatch("showSnackbar", {
          show: true,
          text: `Sorry, title and content are required to create a post.`,
          color: "error",
        });
        return;
      }
      // Using exising data since the API takes a longer time
      // The following response can be commented out when using the API and responseFromApi can be used

      let response = {
        success: true,
        data: {
          response:
            this.newPost.title.toLowerCase().includes("shit") ||
            this.newPost.content.toLowerCase().includes("shit")
              ? "explicit"
              : "",
        },
        status: "200",
      };
      // const responseFromApi = await apiRequestHandler("contentMonitoring", {
      //   content: this.newPost.title + " " + this.newPost.content,
      // });
      // console.log(" Response:", responseFromApi);
      if (response.success && response.data.response !== "explicit") {
        const newThread = {
          id: Math.floor(Math.random() * 10000),
          title: this.newPost.title,
          content: this.newPost.content,
          category: this.newPost.category,
          author: this.$store.getters.currentUser.name,
          created_utc: new Date().toISOString(),
          image: this.newPost.media
            ? URL.createObjectURL(this.newPost.media)
            : null,
          video: null,
          flair: {
            icon: this.getCategoryIcon(this.newPost.category),
          },
        };
        this.threads.unshift(newThread);
        this.dialog = false;
        this.newPost = { title: "", content: "", category: "", media: null };
        this.$store.dispatch("showSnackbar", {
          show: true,
          text: `Your post has been successfully created.`,
          color: "success",
        });
      } else {
        this.$store.dispatch("showSnackbar", {
          show: true,
          text: `Sorry, your post cannot be created as it does not follow community guidelines.`,
          color: "error",
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
