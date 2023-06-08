<template>
  <div class="drawer-wrapper">
    <div class="drawer" @click="() => $emit('openModal')">
      <div class="drawer-text">Открыть VTChat</div>
      <!-- <div class="unread-badge">5</div> -->
    </div>
  </div>
</template>

<script>
import useDrawer from '@/Drawer/Drawer';

export default {
  name: 'MainDrawer',
  setup() {
    return useDrawer();
  }
};
</script>

<style lang="scss" scoped>
@import '@/Drawer/Drawer';
</style>
