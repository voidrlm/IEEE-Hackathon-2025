<template>
  <v-container>
    <v-row class="mt-4">
      <!-- Search Bar -->
      <v-col cols="12" sm="8" lg="6" xl="4">
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
      <v-col cols="12" sm="4" lg="3" xl="2">
        <v-select
          v-model="selectedThemes"
          label="Select themes"
          :items="uniqueThemes"
          variant="solo"
          density="compact"
          rounded
          clearable
        ></v-select>
      </v-col>
      <!-- Benefits Dropdown -->
      <v-col cols="12" sm="4" lg="3" xl="2">
        <v-select
          v-model="selectedBenefits"
          label="Select benefits"
          :items="benefitNames"
          variant="solo"
          density="compact"
          rounded
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <!-- Main Content for Events -->
    <v-row>
      <template v-for="event in filteredEvents" :key="event.id">
        <v-col cols="12" sm="6" lg="4" xl="2">
          <v-card
            class="pa-3"
            elevation="2"
            @click="showEventDetails(event)"
            rounded="xl"
          >
            <v-img
              :src="
                'https://se-images.campuslabs.com/clink/images/' +
                  event.imagePath || 'https://via.placeholder.com/400x200'
              "
              cover
              max-height="200"
              max-width="400"
            ></v-img>
            <v-card-title>{{ event.name }}</v-card-title>
            <v-card-subtitle>
              {{ formatDate(event.startsOn) }} at
              {{ formatTime(event.startsOn) }}
            </v-card-subtitle>
            <v-card-text>{{ event.location }}</v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <!-- Event Details Dialog -->
    <EventDetailsDialog
      :show="showEventDialog"
      :event="selectedEvent"
      @close="showEventDialog = false"
    />
  </v-container>
</template>

<script>
import EventDetailsDialog from "../components/events/eventDialog.vue";
import { events } from "@/resources/web-constants";
export default {
  name: "EventsDashboard",
  components: {
    EventDetailsDialog,
  },
  data() {
    return {
      searchQuery: "",
      selectedThemes: [],
      selectedBenefits: [],
      benefitNames: ["Free Food", "Free Stuff"],
      events: events,
      showEventDialog: false,
      selectedEvent: {},
    };
  },
  computed: {
    uniqueThemes() {
      return [...new Set(this.events.map((event) => event.theme))];
    },
    filteredEvents() {
      let filteredEvents = this.events;

      if (this.searchQuery) {
        filteredEvents = filteredEvents.filter((event) =>
          event.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedThemes && this.selectedThemes.length) {
        filteredEvents = filteredEvents.filter((event) =>
          this.selectedThemes.includes(event.theme)
        );
      }

      if (this.selectedBenefits && this.selectedBenefits.length) {
        filteredEvents = filteredEvents.filter((event) =>
          event.benefitNames.some((benefit) =>
            this.selectedBenefits.includes(benefit)
          )
        );
      }

      return filteredEvents;
    },
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
    showEventDetails(event) {
      this.selectedEvent = event;
      this.showEventDialog = true;
    },
  },
};
</script>

<style scoped></style>
