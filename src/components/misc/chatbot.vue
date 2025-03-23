<template>
  <v-container>
    <v-fab
      app
      elevation="20"
      location="bottom right"
      color="primary"
      rounded="xl"
      class="pa-5 mb-2 mr-2"
      @click="toggleChat"
    >
      <v-img :src="require(`@/assets/cougar.png`)" width="40" />
      <p class="ml-2">Ask cougar</p>
    </v-fab>

    <v-card v-if="showChat" class="chat-container" elevation="10">
      <v-card-title class="d-flex justify-space-between">
        <span class="bold">How may I help you today?</span>

        <v-btn icon flat color="primary" size="small" @click="toggleChat">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="chat-content">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <span :class="message.sender">{{ message.text }}</span>
        </div>
      </v-card-text>

      <v-divider></v-divider>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.2080234683795!2d-73.96543268386965!3d40.7794406414224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25896f660c26f%3A0x3b2fa4f4b6c6a1fa!2sThe%20Metropolitan%20Museum%20of%20Art!5e0!3m2!1sen!2sus!4v1630602971236!5m2!1sen!2sus"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      >
      </iframe>
      <v-card-actions>
        <v-text-field
          v-model="userInput"
          label="Type a message..."
          dense
          hide-details
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn icon color="primary" @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ChatBotComponent",
  data() {
    return {
      showChat: false,
      userInput: "",
      messages: [{ text: "Hello! How can I help you?", sender: "bot" }],
    };
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
    sendMessage() {
      if (this.userInput.trim() === "") return;

      this.messages.push({ text: this.userInput, sender: "user" });

      setTimeout(() => {
        this.messages.push({
          text: "I'm just a bot. How can I assist?",
          sender: "bot",
        });
      }, 1000);

      this.userInput = "";
    },
  },
};
</script>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.chat-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 500px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
}

.chat-content {
  height: 250px;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin: 5px 0;
}

.bot {
  display: block;
  background: #e3f2fd;
  padding: 8px;
  border-radius: 5px;
  align-self: flex-start;
}

.user {
  display: block;
  background: #bbdefb;
  padding: 8px;
  border-radius: 5px;
  align-self: flex-end;
}
</style>
