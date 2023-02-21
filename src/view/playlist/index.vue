<script lang="ts" setup>
import { onMounted } from 'vue';
import { useMain } from '@/hooks/useMainContent';
const { mainPlaylist } = useMain();

onMounted(() => {
  console.log(123);
  mainPlaylist();
});
</script>

<template>
  <div class="">playlist</div>
</template>

<style lang="scss" scoped></style>
