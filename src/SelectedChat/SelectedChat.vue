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
          </span>
        </div>
      </div>
    </div>
    <div class="selected-chat__content">
      <div ref="messagesContainer" class="selected-chat__content-messages">
        <EmptyChat v-if="messages && messages.length === 0" />
        <div v-else class="selected-chat__content-messages-list">
          <div
            :class="[
              'selected-chat__content-messages-list-item',
              isMyMessage(messages[index]) && 'my-message'
            ]"
            v-for="(message, index) in messages"
            :key="messages[index].id"
          >
            <div class="selected-chat__content-messages-list-item_wrapper">
              <div class="selected-chat__content-messages-list-item-avatar">
                <img
                  class="selected-chat__content-messages-list-item-avatar_avatar"
                  :src="`//skin.vimeworld.ru/helm/3d/${messages[index].sender.username}.png`"
                  :alt="messages[index].sender.username"
                />
              </div>
              <div class="selected-chat__content-messages-list-item-content">
                <div class="selected-chat__content-messages-list-item-title">
                  <span v-html="getStyledUsername(messages[index])"></span>
                </div>
                <div class="selected-chat__content-messages-list-item-message">
                  <div
                    class="selected-chat__content-messages-list-item-message_text"
                  >
                    {{ messages[index].text }}
                  </div>
                  <div
                    class="selected-chat__content-messages-list-item-message_time"
                  >
                    <p class="badge badge-time">
                      {{ checkDate(index) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import EmptyChat from '@/SelectedChat/EmptyChat/EmptyChat.vue';
import ChatControls from '@/SelectedChat/ChatControls/ChatControls.vue';
import useSelectedChat from '@/SelectedChat/SelectedChat';

export default {
  setup() {
    return useSelectedChat();
  },
  components: {
    ChatControls,
    EmptyChat
  }
};
</script>

<style lang="scss" scoped>
@import '@/SelectedChat/SelectedChat';
</style>
