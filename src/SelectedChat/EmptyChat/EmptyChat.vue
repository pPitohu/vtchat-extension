<template>
  <div class="empty-chat">
    <sunIcon class="empty-chat-icon" />
    <p class="empty-chat-heading">
      Чат пока пустой, но вы можете написать сообщение!
    </p>
  </div>
</template>

<script>
import sunIcon from '@/Chats/NoChats/sunIcon.vue';
export default {
  components: {
    sunIcon
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/EmptyChat/EmptyChat';
</style>
