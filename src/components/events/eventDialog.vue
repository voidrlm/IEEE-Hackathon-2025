<template>
  <v-dialog :model-value="show" fullscreen @update:modelValue="$emit('close')">
    <v-card>
      <!-- Event Details -->
      <v-card-title class="text-h5">{{ event?.name }}</v-card-title>
      <v-card-text>
        <p><strong>Date:</strong> {{ formatDate(event?.startsOn) }}</p>
        <p>
          <strong>Time:</strong> {{ formatTime(event?.startsOn) }} -
          {{ formatTime(event?.endsOn) }}
        </p>
        <p><strong>Location:</strong> {{ event?.location }}</p>
        <p>
          <strong>Description:</strong>
          <span v-html="event?.description"></span>
        </p>

        <!-- Comments Section -->
        <v-divider class="my-4"></v-divider>
        <v-card class="mx-5 mt-3">
          <v-card-text>
            <!-- Add New Comment -->
            <div class="new-comment mb-4">
              <v-textarea
                v-model="newComment"
                outlined
                rows="3"
                placeholder="Add a comment..."
              ></v-textarea>
              <v-btn color="primary" class="mt-2" @click="addComment"
                >Post Comment</v-btn
              >
            </div>

            <!-- Display Comments -->
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment mb-4"
            >
              <!-- Comment Header -->
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="d-flex align-center">
                  <v-avatar size="36" color="grey lighten-2">
                    {{ comment.user.charAt(0) }}
                  </v-avatar>
                  <div class="ml-5">
                    <span class="font-weight-bold">{{ comment.user }}</span>
                    <div class="text-caption text-grey">
                      {{ formatTimestamp(comment.timestamp) }}
                    </div>
                  </div>
                </div>
                <!-- Actions -->
                <div class="comment-actions d-flex align-center">
                  <v-btn icon small @click="upvote(comment.id)" class="mr-1"
                    >👍</v-btn
                  >{{ comment.upvotes }}
                  <v-btn icon small @click="downvote(comment.id)" class="mr-1"
                    >👎</v-btn
                  >{{ comment.downvotes }}
                  <v-btn icon small @click="bookmark(comment.id)" class="mr-1"
                    >🔖</v-btn
                  >
                  <v-btn icon small @click="share(comment.id)">📤</v-btn>
                </div>
              </div>

              <!-- Comment Body -->
              <div class="comment-body mt-2">
                {{ comment.text }}
              </div>

              <!-- Nested Replies -->
              <div v-if="comment.replies.length" class="replies pl-5 mt-3">
                <h6>Replies</h6>
                <div
                  v-for="reply in comment.replies"
                  :key="reply.id"
                  class="reply mb-2"
                >
                  <span class="font-weight-bold">{{ reply.user }}:</span>
                  {{ reply.text }}
                </div>
              </div>

              <!-- Add Reply -->
              <div class="add-reply mt-3 pl-5">
                <v-textarea
                  v-model="newReply[comment.id]"
                  outlined
                  rows="2"
                  placeholder="Write a reply..."
                ></v-textarea>
                <v-btn color="secondary" small @click="addReply(comment.id)"
                  >Reply</v-btn
                >
              </div>
            </div>

            <!-- No Comments Placeholder -->
            <div v-if="!comments.length" class="text-center text-grey mt-4">
              No comments yet. Be the first to share your thoughts!
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>

      <!-- Close Button -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    event: Object,
  },
  data() {
    return {
      comments: [
        {
          id: 1,
          user: "Student A",
          timestamp: "2025-03-23T12:00:00",
          text: "This is an example comment.",
          upvotes: 10,
          downvotes: 2,
          replies: [
            {
              id: 11,
              user: "Student B",
              text: "Thanks for sharing!",
              timestamp: "2025-03-23T12:30:00",
            },
          ],
        },
      ],
      newComment: "",
      newReply: {},
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { weekday: "long", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatTime(dateString) {
      const options = { hour: "2-digit", minute: "2-digit", hour12: true };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    },
    formatTimestamp(timestamp) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(timestamp).toLocaleString(undefined, options);
    },
    addComment() {
      if (!this.newComment.trim()) {
        alert("Comment cannot be empty!");
        return;
      }
      const newId = this.comments.length + 1;
      this.comments.push({
        id: newId,
        user: "Current User",
        timestamp: new Date().toISOString(),
        text: this.newComment,
        upvotes: 0,
        downvotes: 0,
        replies: [],
      });
      this.newComment = "";
    },
    addReply(commentId) {
      const replyText = this.newReply[commentId];
      if (!replyText || !replyText.trim()) {
        alert("Reply cannot be empty!");
        return;
      }
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment) {
        const replyId = comment.replies.length + 1;
        comment.replies.push({
          id: replyId,
          user: "Current User",
          timestamp: new Date().toISOString(),
          text: replyText,
        });
      }
      this.newReply[commentId] = "";
    },
    upvote(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment) comment.upvotes++;
    },
    downvote(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment) comment.downvotes++;
    },
    bookmark(commentId) {
      console.log(`Bookmarking comment ${commentId}`);
    },
    share(commentId) {
      console.log(`Sharing comment ${commentId}`);
    },
  },
};
</script>

<style scoped>
.comment-body {
  font-size: 14px;
}
.replies h6 {
  font-size: 13px;
}
.add-reply textarea {
  font-size: 13px;
}
.comment-actions .v-btn {
  margin-left: 8px;
}
</style>
