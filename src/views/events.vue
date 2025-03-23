<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar for Filters -->
      <v-col cols="3">
        <v-card class="pa-3" elevation="2">
          <v-card-title class="text-h6">Filters</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchQuery"
              label="Search Events"
              variant="solo"
              dense
              @input="searchEvents"
            ></v-text-field>

            <v-select
              v-model="selectedThemes"
              label="Select themes"
              :items="['Music', 'Art', 'Sports', 'Misc']"
              variant="solo"
              dense
              multiple
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Main Content for Events -->
      <v-col cols="9">
        <v-row>
          <template v-for="event in filteredEvents" :key="event.id">
            <v-col cols="12" sm="6" lg="4" xl="2">
              <v-card
                class="pa-3"
                elevation="2"
                height="300"
                @click="showEventDetails(event)"
              >
                <v-img
                  :src="event.image"
                  cover
                  max-height="200"
                  max-width="400"
                ></v-img>
                <v-card-title>{{ event.title }}</v-card-title>
                <v-card-subtitle>
                  {{ event.date }} at {{ event.time }}
                </v-card-subtitle>
                <v-card-text>{{ event.location }}</v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-col>
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

export default {
  name: "EventsDashboard",
  components: {
    EventDetailsDialog,
  },
  data() {
    return {
      searchQuery: "",
      selectedThemes: [],
      events: [
        {
          id: 1,
          title: "Jam Out! With Jazz Workshop",
          date: "Sunday, March 23",
          time: "2023-03-23T12:30:00Z",
          location: "Fuller Music Center Estabrook",
          image: "https://picsum.photos/200/300",
          description: "Join us for an afternoon of jazz music and fun!",
          theme: "Music",
        },
        {
          id: 2,
          title: "CUSC Elections Committee Weekly Meeting",
          date: "Sunday, March 23",
          time: "2023-03-23T13:00:00Z",
          location: "Clark Undergraduate Student Council Office",
          image: "https://picsum.photos/200/300",
          description:
            "Join the CUSC Elections Committee for their weekly meeting.",
          theme: "Misc",
        },
      ],
      showEventDialog: false,
      selectedEvent: {},
    };
  },
  computed: {
    filteredEvents() {
      let filteredEvents = this.events;

      if (this.searchQuery) {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedThemes.length) {
        filteredEvents = filteredEvents.filter((event) =>
          this.selectedThemes.includes(event.theme)
        );
      }

      return filteredEvents;
    },
  },
  methods: {
    searchEvents() {
      console.log("Searching for", this.searchQuery);
    },
    showEventDetails(event) {
      this.selectedEvent = event;
      this.showEventDialog = true;
    },
  },
};
</script>

<style scoped></style>
