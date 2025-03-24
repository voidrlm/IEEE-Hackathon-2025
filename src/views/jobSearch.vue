<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" app permanent width="300">
    <v-card class="px-4 py-2" flat>
      <v-btn
        color="primary"
        class="mt-2"
        block
        @click="triggerFileInput"
        elevation="2"
        rounded
      >
        Search by resume
      </v-btn>
      <input
        type="file"
        ref="fileInput"
        accept="application/pdf"
        hidden
        @change="handleFileUpload"
      />
    </v-card>
    <!-- Job List -->
    <v-list dense>
      <v-list-item
        v-for="job in filteredJobs"
        :key="job.id"
        @click="selectJob(job)"
        :class="{ 'active-job': selectedJob?.id === job.id }"
        class="job-item pa-2"
      >
        <template v-slot:prepend>
          <v-avatar>
            <img :src="job.companyLogo" alt="Company Logo" />
          </v-avatar>
        </template>
        <v-list-item-title>{{ job.title }}</v-list-item-title>
        <v-list-item-subtitle class="text-body-2 secondary--text">
          {{ job.company }} • {{ job.location }}
        </v-list-item-subtitle>
        <span class="text-caption text-muted">{{
          formatDate(job.postedDate)
        }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Main Content Area -->

  <v-container fluid class="pa-4">
    <!-- Job Details -->
    <div v-if="selectedJob">
      <div class="d-flex align-center mb-4">
        <img
          :src="selectedJob.companyLogo"
          alt="Company Logo"
          class="company-logo mr-3"
        />
        <div>
          <h2 class="mb-1">{{ selectedJob.title }}</h2>
          <p class="text-body-2 secondary--text">
            {{ selectedJob.company }} • {{ selectedJob.location }}
          </p>
        </div>
        <v-spacer />
        <!-- Apply Button -->
        <v-btn color="primary" small @click="applyToJob(selectedJob.id)">
          Apply Now
        </v-btn>
      </div>

      <!-- Job Metadata -->
      <p class="text-body-2 mb-3">
        Posted: {{ formatDate(selectedJob.postedDate) }}
      </p>

      <!-- Job Description -->
      <p v-if="selectedJob.description" class="mb-3">
        {{ selectedJob.description }}
      </p>

      <!-- Skills Required -->
      <div v-if="selectedJob.skills.length" class="mb-3">
        <strong>Skills:</strong>
        <span
          v-for="skill in selectedJob.skills"
          :key="skill"
          class="chip mr-2"
        >
          {{ skill }}
        </span>
      </div>

      <!-- Salary Range -->
      <p v-if="selectedJob.salaryRange" class="mb-3">
        Salary: {{ selectedJob.salaryRange }}
      </p>

      <!-- Footer Links (e.g., Save, Share) -->
      <div class="d-flex justify-end mt-4">
        <v-btn text small color="secondary">Save</v-btn>
        <v-btn text small color="secondary">Share</v-btn>
      </div>
    </div>

    <!-- Placeholder when no job is selected -->
    <div v-else class="placeholder text-center text-muted">
      Select a job to view details.
    </div>
  </v-container>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
export default {
  name: "JobSearchView",
  data() {
    return {
      drawer: true,
      jobs: [],
      searchQuery: "",
      selectedFilters: [],
      selectedJob: null,
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let textContent = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            textContent += text.items.map((item) => item.str).join(" ") + " ";
          }
          console.log("Extracted Text:", textContent);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Please upload a valid PDF file.");
      }
    },
    // Fetch mock jobs
    async getJobs() {
      this.jobs = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        title: `Java Intern`,
        company: `Company ${index + 1}`,
        companyLogo: `https://picsum.photos/100?random=${index + 1}`,
        postedDate: new Date().toISOString(),
        description: `This is the description of job ${index + 1}.`,
        location: `City ${index % 10}, Country`,
        salaryRange:
          index % 2 === 0 ? `$${50 + index}k - $${70 + index}k` : null,
        skills: ["Java", "Spring Boot", "SQL"].slice(0, (index % 3) + 1),
      }));
    },
    // Apply to a job
    applyToJob(jobId) {
      alert(`You have applied to Job ID ${jobId}`);
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
    // Search for jobs
    searchJobs() {
      this.filteredJobs = this.jobs.filter((job) =>
        job.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // Select a job to display details
    selectJob(job) {
      this.selectedJob = job;
    },
    // Upload resume
    uploadResume() {
      alert("Upload resume feature is not implemented yet!");
    },
  },
  computed: {
    filteredJobs() {
      if (!this.searchQuery) return this.jobs;
      return this.jobs.filter((job) =>
        job.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.active-job {
  background-color: #e0e0e0;
}

.chip {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 16px;
}

.placeholder {
  font-size: larger;
}
</style>
