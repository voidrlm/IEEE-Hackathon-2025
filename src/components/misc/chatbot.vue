<template>
  <v-container>
    <!-- Chat Button -->
    <v-fab
      app
      elevation="20"
      location="bottom right"
      color="primary"
      rounded="xl"
      class="pa-5 mb-2 mr-2"
      @click="toggleChat"
    >
      <v-img :src="require(`@/assets/cougar.png`)" width="50" />
      <p class="ml-2 mt-n3">Ask Cougar</p>
    </v-fab>

    <!-- Chat Dialog -->
    <v-card v-if="showChat" class="chat-container" elevation="10">
      <v-card-title class="d-flex justify-space-between">
        <span class="bold">Cougar AI</span>
        <v-btn icon flat color="primary" size="25" @click="toggleChat">
          <v-icon size="20">mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="chat-content">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <v-row
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <v-col cols="auto" class="d-flex align-center">
              <v-avatar
                v-if="message.sender !== 'user'"
                size="32"
                class="mr-2"
                color="primary"
              >
                <v-img :src="require(`@/assets/cougar.png`)" />
              </v-avatar>
              <v-card
                :color="message.sender === 'user' ? 'blue' : 'primary'"
                class="pa-0"
              >
                <v-card-text
                  style="word-break: break-word; white-space: pre-wrap"
                  class="pa-1"
                  >{{ message.text }}</v-card-text
                >
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Input Field -->
      <v-card-actions>
        <v-text-field
          variant="solo"
          prepend-inner-icon="mdi-message"
          density="compact"
          v-model="userInput"
          label="Type a message..."
          rounded="xl"
          hide-details
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn icon color="primary" @click="sendMessage" :loading="isLoading">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Ride Request Dialog -->
    <v-dialog v-model="showRideDialog" fullscreen>
      <v-card>
        <!-- Dialog Header -->
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Ride Request</span>
          <v-btn icon @click="closeRideDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Map Section -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.2080234683795!2d-73.96543268386965!3d40.7794406414224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25896f660c26f%3A0x3b2fa4f4b6c6a1fa!2sThe%20Metropolitan%20Museum%20of%20Art!5e0!3m2!1sen!2sus!4v1630602971236!5m2!1sen!2sus"
          width="100%"
          height="400px"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>

        <!-- Ride Details -->
        <div class="details mt-4 px-4">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="dropoffLocation"
                label="Drop-off Location"
                variant="solo-filled"
                rounded
                density="compact"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="pickupTime"
                label="Desired Pickup Time"
                :items="['ASAP', 'In 15 minutes', 'In 30 minutes']"
                variant="solo-filled"
                rounded
                density="compact"
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex justify-end px-4 mt-4">
          <v-btn color="primary" @click="requestRide">Request Ride</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- Food Order Dialog -->
    <v-dialog
      v-model="showFoodDialog"
      max-width="800px"
      content-class="rounded-xl"
    >
      <v-card rounded="xl">
        <!-- Dialog Header -->
        <v-card-title class="d-flex justify-space-between">
          <span class="bold">Order Food from Higgins Cafe</span>
          <v-btn
            icon
            flat
            color="primary"
            size="25"
            @click="showFoodDialog = false"
          >
            <v-icon size="20">mdi-close-circle</v-icon>
          </v-btn>
        </v-card-title>

        <v-row class="mx-4">
          <v-col cols="3">
            <v-img
              src="https://cdn.clarku.edu/map/wp-content/uploads/sites/347/2023/07/higgins-cafe.jpg"
              alt="Higgins Cafe"
              width="100%"
              class="mb-4"
            />
          </v-col>
          <v-col cols="9">
            <p class="text-subtitle-1">
              Higgins Cafe is located in the lower level of the University
              Center. It offers a variety of food options, including sandwiches,
              salads, and hot entrees.
            </p>
          </v-col>
        </v-row>

        <!-- Order Form -->
        <v-card-text class="px-4">
          <v-form ref="foodForm" @submit.prevent="orderFood">
            <!-- Multi-select for food items -->
            <v-select
              v-model="selectedFoods"
              label="Select Food Items"
              :items="menuItems"
              variant="solo-filled"
              rounded
              density="compact"
              multiple
              item-title="name"
              item-value="name"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" type="submit" @click="orderFood">Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Map Dialog -->
    <v-dialog v-model="showMapDialog" max-width="800px">
      <v-card>
        <v-card-title>Map</v-card-title>
        <iframe
          class="map"
          width="100%"
          height="700"
          :src="`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2953.3310188908836!2d${coordinates.longitude}!3d${coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDE1JzAwLjQiTiA3McKwNDknMjIuNiJX!5e0!3m2!1sen!2sus!4v1742810843744!5m2!1sen!2sus`"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <v-card-actions>
          <v-btn color="primary" @click="showMapDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { apiRequestHandler } from "@/services/rest-api-manager";
import { foodItems } from "@/resources/web-constants";
export default {
  name: "ChatBotComponent",
  data() {
    return {
      isLoading: false,
      showChat: false,
      showRideDialog: false,
      showMapDialog: false,
      showFoodDialog: false,
      userInput: "",
      selectedFoods: [],
      messages: [
        {
          text: "Roooaaaaar! *wink wink* Hi there! How can I help you?",
          sender: "bot",
        },
      ],

      dropoffLocation: this.$store.getters.currentUser.location,
      pickupTime: "ASAP",
      currentLocation: "",
      coordinates: {
        lat: 0,
        lng: 0,
        zoom: 0,
      },
      menuItems: foodItems,
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = `${position.coords.latitude}, ${position.coords.longitude}`;
        console.log(this.currentLocation);
      });
    }
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
    async sendMessage() {
      if (!this.userInput.trim()) return;
      this.isLoading = true;
      // Add user message to chat
      this.messages.push({ text: this.userInput, sender: "user" });

      try {
        // Call API with user input
        if (this.userInput.toLowerCase().includes("book a ride")) {
          setTimeout(() => {
            this.messages.push({
              text: "Let me check for available rides...",
              sender: "bot",
            });

            this.showRideDialog = true;
          }, 1000);
        } else if (this.userInput.toLowerCase().includes("order food")) {
          setTimeout(() => {
            this.messages.push({
              text: "Wait a sec, lemme pull up Higgins menu",
              sender: "bot",
            });
            this.showFoodDialog = true;
          }, 1000);
        } else {
          var response = await apiRequestHandler("chatbot", {
            question: this.userInput,
          });
          if (response.success) {
            if (response.data.co_ordinates) {
              this.messages.push({ text: "Opening Maps...", sender: "bot" });
              this.coordinates = response.data.co_ordinates;
              setTimeout(() => {
                this.showMapDialog = true;
              }, 3000);
            } else {
              this.messages.push({
                text: response.data.response,
                sender: "bot",
              });
            }
          } else {
            this.messages.push({
              text: "Sorry, I couldn't process your request. Please try again later.",
              sender: "bot",
            });
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        this.messages.push({
          text: "An error occurred while communicating with the server.",
          sender: "bot",
        });
      }

      this.isLoading = false;
      this.userInput = "";
    },
    closeRideDialog() {
      this.showRideDialog = false;
    },
    requestRide() {
      if (!this.dropoffLocation) {
        alert("Please fill in Drop-off locations.");
        return;
      }

      this.messages.push({
        text:
          "Ride requested to " +
          this.dropoffLocation +
          " in " +
          this.pickupTime +
          ".",
        sender: "bot",
      });

      this.closeRideDialog();
    },
    orderFood() {
      if (this.selectedFoods.length === 0) {
        this.$store.dispatch("showSnackbar", {
          show: true,
          text: "Please select a food item.",
          color: "success",
        });
        return;
      }

      let total = 0;
      this.selectedFoods.forEach((food) => {
        total += foodItems.find((item) => item.name === food).price;
      });
      this.messages.push({
        text: this.selectedFoods
          .map(
            (food) =>
              "Order for " +
              food +
              " placed. Price: $" +
              foodItems.find((item) => item.name === food).price
          )
          .join("\n"),
        sender: "bot",
      });
      this.messages.push({
        text: "Order placed successfully for $" + total.toFixed(2) + "...",
        sender: "bot",
      });

      setTimeout(() => {
        this.messages.push({
          text: "Driver David will be there in 5 minutes.",
          sender: "bot",
        });
      }, 1000);
      this.selectedFoods = [];
      this.showFoodDialog = false;
    },
  },
};
</script>

<style scoped>
.chat-container {
  border-radius: 25px;
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 500px;
  min-height: 500px;
}

.chat-content {
  height: 400px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.bot {
  background-color: #e3f2fd;
  padding: 8px;
  border-radius: 5px;
}

.user {
  background-color: #bbdefb;
  padding: 8px;
  border-radius: 5px;
}
</style>
