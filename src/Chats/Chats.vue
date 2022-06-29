<template>
  <div class="chats">
    <div class="chats-header">
      <p>Чаты</p>
      <div>
        <vs-switch color="#323232" v-model="isMyChatsActive">
          <template #on> Мои чаты </template>
          <template #off> Все чаты </template>
        </vs-switch>
      </div>
    </div>
    <div class="chats-list" v-show="isMyChatsActive">
      <ChatItem
        v-for="chatUser in chatUsers"
        :user="chatUser"
        :key="chatUser.id"
      />
      <NoChats v-if="!chatUsers.length" />
    </div>
    <div class="chats-list" v-show="!isMyChatsActive">
      <ChatItem v-for="user in users" :user="user" :key="user.id" />
      <NoChats v-if="!users.length" />
    </div>
  </div>
</template>

<script>
import NoChats from '@/Chats/NoChats/NoChats.vue';
import ChatItem from '@/Chats/ChatItem/ChatItem.vue';
import useChats from '@/Chats/Chats';

export default {
  name: 'ChatsHandler',
  setup() {
    return useChats();
  },
  components: {
    ChatItem,
    NoChats
  }
};
</script>

<style lang="scss" scoped>
@import '@/Chats/Chats';
</style>
