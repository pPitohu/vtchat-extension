<template>
  <div class="chats-wrapper">
    <Chats />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Chats from '@/Chats/Chats.vue';

export default {
  name: 'ChatsWrapper',
  components: {
    Chats
  }
};
</script>

<style lang="scss" scoped>
@import '@/ChatsWrapper/ChatsWrapper';
</style>
