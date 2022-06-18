<template>
  <div class="test">hello world {{ user }}</div>
</template>

<script lang="ts">
import useApp from '@/App/App';

export default {
  name: 'App',
  setup() {
    return useApp();
  }
};
</script>

<style lang="scss" scoped></style>
