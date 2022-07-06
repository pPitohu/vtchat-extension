<template>
  <div
    ref="msgRef"
    :class="[
      'selected-chat__content-messages-list-item',
      isMyMessage(message) && 'my-message'
    ]"
  >
    <div class="selected-chat__content-messages-list-item_wrapper">
      <div class="selected-chat__content-messages-list-item-avatar">
        <img
          class="selected-chat__content-messages-list-item-avatar_avatar"
          :src="`//skin.vimeworld.ru/helm/3d/${message.sender.username}.png`"
          :alt="message.sender.username"
        />
      </div>
      <div class="selected-chat__content-messages-list-item-content">
        <div class="selected-chat__content-messages-list-item-title">
          <span v-html="getStyledUsername(message)"></span>
        </div>
        <div class="selected-chat__content-messages-list-item-message">
          <div class="selected-chat__content-messages-list-item-message_text">
            {{ message.text }}
          </div>
          <div class="selected-chat__content-messages-list-item-message_time">
            <p class="badge badge-time">
              {{ checkDate(message) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useMessage from '@/SelectedChat/MessagesList/Message/Message';

export default {
  name: 'MessageItem',
  props: ['messages', 'message', 'index'],
  setup() {
    return useMessage();
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/MessagesList/Message/Message.scss';
</style>
