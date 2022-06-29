<template>
  <div class="vtchat-extension">
    <Dialog :isModalOpen="isModalOpen" @closeModal="setModalClose" />
    <Drawer @openModal="setModalOpen" />
  </div>
</template>

<script lang="ts">
import useApp from '@/App/App';
import Dialog from '@/Dialog/Dialog.vue';
import Drawer from '@/Drawer/Drawer.vue';

export default {
  name: 'App',
  setup() {
    return useApp();
  },
  components: {
    Dialog,
    Drawer
  }
};
</script>

<style lang="scss" scoped>
@import '@/App/App';
</style>
