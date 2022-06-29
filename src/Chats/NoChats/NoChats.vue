<template>
  <div class="no-chats">
    <p class="no-chats__title">Здесь пусто...</p>
    <sunIcon />
  </div>
</template>

<script>
import sunIcon from './sunIcon.vue';
export default {
  components: {
    sunIcon
  }
};
</script>

<style lang="scss" scoped>
@import '@/Chats/NoChats/NoChats';
</style>
