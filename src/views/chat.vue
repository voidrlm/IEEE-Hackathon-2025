<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar -->
      <v-col cols="3" class="sidebar">
        <v-text-field
          v-model="searchQuery"
          label="Search Chats"
          variant="solo"
          prepend-inner-icon="mdi-magnify"
          rounded="xl"
          density="compact"
          @input="searchChats"
        />
        <v-btn block color="primary" @click="openCreateGroupDialog" rounded="xl"
          ><v-icon start> mdi-plus-circle</v-icon>Create Group</v-btn
        >
        <v-list>
          <v-list-item
            v-for="chat in filteredChats"
            :key="chat.id"
            @click="selectChat(chat)"
            class="chat-item"
          >
            <template v-slot:prepend>
              <v-avatar v-if="chat.isGroup" color="blue">
                <v-icon>mdi-account-group</v-icon>
              </v-avatar>
              <v-avatar v-else color="blue">
                {{ chat.name[0] }}
              </v-avatar>
            </template>
            <v-list-item-title>{{ chat.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ chat.lastMessage }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Chat Window -->
      <v-col cols="9" class="chat-window">
        <v-toolbar color="primary" dark v-if="selectedChat">
          <v-toolbar-title>{{ selectedChat?.name || "" }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="selectedChat?.isGroup" icon @click="openEditGroupDialog">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Show Group Members -->
        <v-card v-if="selectedChat?.isGroup" class="members-card">
          <v-card-title>Members</v-card-title>
          <v-card-text>
            <v-chip
              v-for="member in selectedChat?.members"
              :key="member"
              class="member-chip"
            >
              {{ member }}
            </v-chip>
          </v-card-text>
        </v-card>

        <v-container
          class="messages"
          ref="messageContainer"
          v-if="selectedChat"
        >
          <v-row
            v-for="(message, index) in selectedChat?.messages || []"
            :key="index"
          >
            <v-col :class="{ 'text-right': message.sender === 'me' }">
              <v-chip :color="message.sender === 'me' ? 'blue' : 'grey'" dark>
                <strong v-if="message.sender !== 'me'"
                  >{{ message.sender }}: </strong
                >{{ message.text }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else>
          <div class="d-flex justify-center align-center" style="height: 100%">
            <div>
              <v-img
                height="150"
                width="150"
                :src="require(`@/assets/empty_state.png`)"
              />
              <v-subtitle class="mt-2 text-center text-h6 bold"
                >Please select a chat</v-subtitle
              >
            </div>
          </div>
        </v-container>

        <!-- Message Input -->
        <v-footer class="message-input" v-if="selectedChat">
          <v-text-field
            v-model="newMessage"
            label="Type a message"
            rounded="xl"
            density="compact"
            variant="solo"
            prepend-inner-icon="mdi-message"
            class="mr-3"
            @keyup.enter="sendMessage"
          />
          <v-btn color="primary" class="mt-n5" @click="sendMessage">Send</v-btn>
        </v-footer>
      </v-col>
    </v-row>

    <!-- Create Group Dialog -->
    <v-dialog
      v-model="createGroupDialog"
      max-width="400px"
      content-class="rounded-xl"
    >
      <v-card rounded="xl">
        <v-card-title>Create Group</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newGroupName"
            label="Group Name"
            required
            rounded="xl"
            density="compact"
            variant="solo"
            prepend-inner-icon="mdi-account-group"
          />
          <v-autocomplete
            v-model="selectedMembers"
            :items="users"
            label="Add Members"
            multiple
            chips
            rounded="xl"
            density="compact"
            variant="solo"
            item-title="name"
            item-value="name"
            prepend-inner-icon="mdi-account-multiple-plus"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.avatar_url"
                :subtitle="item.raw.id"
                :title="item.raw.name"
              ></v-list-item></template
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="createGroupDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createGroup">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Group Dialog -->
    <v-dialog v-model="editGroupDialog" max-width="400px">
      <v-card>
        <v-card-title>Edit Group</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="selectedChat.name"
            label="Group Name"
            required
            rounded="xl"
            density="compact"
            variant="solo"
            prepend-inner-icon="mdi-account-group"
          />
          <v-autocomplete
            v-model="selectedChat.members"
            :items="users"
            label="Edit Members"
            multiple
            chips
            item-title="name"
            item-value="name"
            rounded="xl"
            density="compact"
            variant="solo"
            prepend-inner-icon="mdi-account-multiple-plus"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.avatar_url"
                :subtitle="item.raw.id"
                :title="item.raw.name"
              ></v-list-item> </template
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="editGroupDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveGroupChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { users } from "../resources/web-constants.js";
export default {
  name: "ChatView",
  data() {
    return {
      chats: [
        {
          id: 1,
          name: "Kashif Kashif Ahmed Chowdry",
          lastMessage: "Hey there! ",
          messages: [],
          isGroup: false,
        },
        {
          id: 2,
          name: "Software Engineering OGs",
          lastMessage: "Meeting at 3 PM",
          messages: [],
          isGroup: true,
          members: ["Manthan Manohar Sumbhe", "Uranbileg Enkhjargal"],
        },
      ],
      users: users,
      selectedMembers: [],
      selectedChat: null,
      newMessage: "",
      createGroupDialog: false,
      editGroupDialog: false,
      newGroupName: "",
      searchQuery: "",
    };
  },
  computed: {
    filteredChats() {
      return this.chats.filter((chat) => {
        const name = chat.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return name.includes(query);
      });
    },
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat;
    },
    sendMessage() {
      if (this.newMessage.trim() && this.selectedChat) {
        this.selectedChat.messages.push({
          sender: "me",
          text: this.newMessage,
        });
        this.selectedChat.lastMessage = this.newMessage;
        const isGroup = this.selectedChat.isGroup;
        const botName = isGroup
          ? this.selectedChat.members[
              Math.floor(Math.random() * this.selectedChat.members.length)
            ]
          : this.selectedChat.name;
        this.selectedChat.messages.push({
          sender: botName,
          text: "Thank you for your message! We'll get back to you shortly.",
        });
        this.newMessage = "";
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messageContainer = this.$refs.messageContainer;
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
    },
    openCreateGroupDialog() {
      this.createGroupDialog = true;
    },
    createGroup() {
      if (this.newGroupName.trim() && this.selectedMembers.length > 0) {
        this.chats.push({
          id: Date.now(),
          name: this.newGroupName,
          lastMessage: "",
          messages: [],
          isGroup: true,
          members: [...this.selectedMembers],
        });
        this.newGroupName = "";
        this.selectedMembers = [];
        this.createGroupDialog = false;
      }
    },
    openEditGroupDialog() {
      this.editGroupDialog = true;
    },
    saveGroupChanges() {
      this.editGroupDialog = false;
    },
    searchChats() {
      this.filteredChats = this.chats.filter((chat) => {
        const name = chat.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return name.includes(query);
      });
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto;

  padding: 10px;
}

.chat-item {
  border-radius: 10px;
  margin: 5px 0;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100vh;

  border-radius: 10px;
}

.members-card {
  margin: 10px;
  padding: 10px;

  border-radius: 10px;
}

.member-chip {
  margin: 2px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;

  border-radius: 10px;
}

.message-input {
  display: flex;
  padding: 8px;

  border-radius: 10px;
}
</style>
