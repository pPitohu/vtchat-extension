<template>
  <div class="selected-chat__content-messages-wrapper">
    <div
      ref="messagesContainer"
      @scroll="onContainerScroll"
      v-chat-scroll="{
        enabled: true,
        always: true,
        smooth: false,
        notSmoothOnInit: true
      }"
      @v-chat-scroll-top-reached="preventTopScroll"
      class="selected-chat__content-messages"
    >
      <EmptyChat v-if="messages && messages.length === 0" />
      <div v-else class="selected-chat__content-messages-list">
        <Message
          v-for="(message, index) in messages"
          :key="messages[index].id"
          :messages="messages"
          :message="message"
          :index="index"
        />
      </div>
    </div>
    <vs-button
      v-show="appendScrollButton"
      class="selected-chat__content_scroll-to-bottom"
      circle
      icon
      floating
      @click.stop.prevent="scrollToBottom"
    >
      <i class="bx bx-down-arrow-alt"></i>
    </vs-button>
  </div>
</template>

<script>
import EmptyChat from '@/SelectedChat/EmptyChat/EmptyChat.vue';
import useMessagesList from '@/SelectedChat/MessagesList/MessagesList';
import Message from '@/SelectedChat/MessagesList/Message/Message.vue';

export default {
  props: ['messages'],
  setup(_, context) {
    return useMessagesList(context);
  },
  components: {
    EmptyChat,
    Message
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/MessagesList/MessagesList.scss';
</style>
