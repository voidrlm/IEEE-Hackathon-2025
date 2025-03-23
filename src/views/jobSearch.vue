<template>
  <v-container>
    <!-- Filters -->
    <v-row class="mt-4">
      <v-col cols="12" md="4" offset-md="4">
        <v-select
          v-model="selectedCategory"
          label="Select a job category"
          :items="categories"
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card
          rounded="xl"
          class="pa-4 mb-4"
          elevation="3"
          v-for="job in filteredJobs"
          :key="job.id"
        >
          <!-- Job Header -->
          <v-card-title class="text-h5 d-flex align-center">
            <v-avatar size="36" class="mr-3">
              <img :src="job.companyLogo" alt="Company Logo" />
            </v-avatar>
            <span>{{ job.title }}</span>
            <v-spacer />
            <!-- Apply Button -->
            <v-btn color="primary" small @click="applyToJob(job.id)">
              Apply Now
            </v-btn>
          </v-card-title>

          <!-- Job Metadata -->
          <v-card-subtitle class="text-body-2 secondary--text">
            {{ job.category }} • Posted by
            <span class="font-weight-medium">{{ job.company }}</span> •
            {{ formatDate(job.postedDate) }}
          </v-card-subtitle>

          <!-- Job Description -->
          <v-card-text v-if="job.description" class="text-body-1 mb-3">
            {{ job.description }}
          </v-card-text>

          <!-- Job Location -->
          <div class="text-body-2 mb-3">
            <strong>Location:</strong> {{ job.location }}
          </div>

          <!-- Salary Range -->
          <div v-if="job.salaryRange" class="text-body-2 mb-3">
            <strong>Salary:</strong> {{ job.salaryRange }}
          </div>

          <!-- Skills Required -->
          <div v-if="job.skills.length" class="text-body-2 mb-3">
            <strong>Skills:</strong>
            <span v-for="skill in job.skills" :key="skill" class="chip mr-2">
              {{ skill }}
            </span>
          </div>

          <!-- Comments Section -->
          <v-card-subtitle class="text-h6">Comments</v-card-subtitle>
          <div v-for="comment in job.comments" :key="comment.id" class="mb-4">
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
            <v-btn icon small @click="replyToComment(job.id, comment.id)">
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
            v-model="newComment[job.id]"
            outlined
            rows="2"
            placeholder="Add a comment..."
            class="mb-3"
          ></v-textarea>
          <v-btn color="primary" small @click="addComment(job.id)"
            >Comment</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "JobSearchView",
  data() {
    return {
      jobs: [],
      categories: ["Engineering", "Marketing", "Design", "Finance", "Other"],
      selectedCategory: null,
      newComment: {},
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    // Fetch mock jobs
    async getJobs() {
      this.jobs = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Job Title ${index + 1}`,
        category: this.categories[index % 5],
        company: `Company ${index + 1}`,
        companyLogo: `https://picsum.photos/100?random=${index + 1}`,
        postedDate: new Date().toISOString(),
        description: `This is the description of job ${index + 1}.`,
        location: `City ${index % 10}, Country`,
        salaryRange:
          index % 2 === 0 ? `$${50 + index}k - $${70 + index}k` : null,
        skills: ["Skill A", "Skill B", "Skill C"].slice(0, (index % 3) + 1),
        comments: [],
      }));
    },
    // Apply to a job
    applyToJob(jobId) {
      alert(`You have applied to Job ID ${jobId}`);
    },
    // Add comment to job
    addComment(jobId) {
      const text = this.newComment[jobId];
      if (!text || !text.trim()) {
        alert("Comment cannot be empty!");
        return;
      }
      const job = this.jobs.find((j) => j.id === jobId);
      const commentId = job.comments.length + 1;
      job.comments.push({
        id: commentId,
        user: "Current User",
        timestamp: new Date().toISOString(),
        text,
        replies: [],
      });
      this.newComment[jobId] = "";
    },
    // Reply to comment
    replyToComment(jobId, commentId) {
      const replyText = prompt("Enter your reply:");
      if (!replyText || !replyText.trim()) {
        alert("Reply cannot be empty!");
        return;
      }
      const job = this.jobs.find((j) => j.id === jobId);
      const comment = job.comments.find((c) => c.id === commentId);
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
    filteredJobs() {
      if (!this.selectedCategory) return this.jobs;
      return this.jobs.filter((job) => job.category === this.selectedCategory);
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
.chip {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 16px;
}
</style>
