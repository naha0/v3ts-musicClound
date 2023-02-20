<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-16 18:43:00
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:56:06
 * @FilePath: \v3ts1\src\components\Lyric\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="relative">
    <div ref="lyricBox" class="absolute h-12 overflow-y-scroll w-full">
      <template v-for="(item, key, index) in SongStore.handlerLyric" :key="index">
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
import { ref, watch } from 'vue';
import { useSongStore } from '@/store/modules/SongStore';
const SongStore = useSongStore();
const lyricIndex = ref();
const lyricBox = ref();
watch(
  () => SongStore.currentTime,
  newValue => {
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
