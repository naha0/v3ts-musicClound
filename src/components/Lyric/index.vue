<template>
  <div class="relative">
    <div ref="lyricBox" class="absolute h-12 overflow-y-scroll w-full">
      <template
        v-for="(item, key, index) in SongStore.handlerLyric"
        :key="index"
      >
        <div
          class="h-6 flex flex-wrap text-center justify-center"
          :class="{ current: index === lyricIndex }"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import useSong from "@/store/SongStore";
const SongStore = useSong();
const lyricIndex = ref();
const lyricBox = ref();
watch(
  () => SongStore.currentTime,
  (newValue) => {
    if (SongStore.lyricActive) {
      let i = 0;
      for (let key in SongStore.handlerLyric) {
        if (+key == newValue) {
          lyricIndex.value = i;
          lyricBox.value.scrollTop = 24 * lyricIndex.value;
        }
        i++;
      }
    }
  }
);
</script>

<style lang="scss" scoped>
.current {
  color: #5dc3fe;
  font-size: 16px;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 10px !important;
}
</style>
