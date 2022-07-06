<template>
  <div class="selected-chat">
    <div class="selected-chat__header">
      <div class="selected-chat__header-title">
        <img
          class="selected-chat__header-title_avatar"
          :src="`//skin.vimeworld.ru/helm/3d/${reciever.username}.png`"
          :alt="reciever.username"
        />
        <div class="selected-chat__header-title_name">
          <span :class="['name-label', reciever.rank.toLowerCase()]">
            [{{ reciever.rank }}] {{ reciever.username }}
          </span>
          <span class="online-label">
            <span v-if="reciever.online" class="badge online-badge">
              Онлайн
            </span>
            <span v-else class="badge offline-badge">Оффлайн</span>
            <span class="typing">{{ isTyping ? 'печатает...' : '' }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="selected-chat__content">
      <MessagesList :messages="messages" @loadMoreMessages="loadMoreMessages" />
      <ChatControls
        :message="message"
        :isSending="isSending"
        @insertEmoji="insertEmoji"
        @inputChange="onInputChange"
        @sendMessage="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import MessagesList from '@/SelectedChat/MessagesList/MessagesList.vue';
import ChatControls from '@/SelectedChat/ChatControls/ChatControls.vue';
import useSelectedChat from '@/SelectedChat/SelectedChat';

export default {
  setup() {
    return useSelectedChat();
  },
  components: {
    ChatControls,
    MessagesList
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/SelectedChat';
</style>
