<template>
  <vs-dialog
    overflow-hidden
    :loading="isLoaded"
    class="main-window"
    v-model="isOpen"
    @close="emitCloseModal"
    blur
  >
    <template #header>
      <h4 class="main-window-header">VTChat extension</h4>
    </template>
    <div class="main-window-divider"></div>
    <ChatsWrapper />
  </vs-dialog>
</template>

<script>
import useDialog from '@/Dialog/Dialog';
import ChatsWrapper from '@/ChatsWrapper/ChatsWrapper.vue';

export default {
  name: 'MainDialog',
  props: ['isModalOpen'],
  setup(props, context) {
    return useDialog(props, context);
  },
  components: {
    ChatsWrapper
  }
};
</script>

<style lang="scss" scoped>
@import '@/Dialog/Dialog';
</style>
