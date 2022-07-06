<template>
  <div
    :class="['chat-item', $route.fullPath.includes(user.username) && 'active']"
    @click="chooseChat"
  >
    <img
      class="chat-item__avatar"
      :src="`//skin.vimeworld.com/helm/3d/${user.username}.png`"
      :alt="user.username"
    />
    <div class="chat-item__content">
      <div :class="['chat-item__content-title', user.rank.toLowerCase()]">
        [{{ user.rank.slice(0, 1).toUpperCase() }}]
        {{ user.username }}
      </div>
      <div class="chat-item__content-text">
        <p class="chat-item__content-text_last-message">
          <span v-show="isTyping" class="typing">печатает...</span>
          <span v-show="!isTyping">{{ lastMessageText }}</span>
        </p>
        <div v-if="user.online" class="badge online-badge badge-circle"></div>
        <div v-else class="badge offline-badge badge-circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import useChatItem from '@/Chats/ChatItem/ChatItem';

export default {
  name: 'ChatItem',
  props: ['user'],
  setup(props) {
    return useChatItem(props);
  }
};
</script>

<style lang="scss" scoped>
@import '@/Chats/ChatItem/ChatItem';
</style>
