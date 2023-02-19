<script setup lang="ts">
import {
  CaretForwardCircleOutline,
  PauseCircleOutline,
  PlaySkipBack,
  PlaySkipForward,
  ListCircleOutline,
} from "@vicons/ionicons5";
import { ref, watch } from "vue";
import Lyric from "@/components/Lyric/index.vue";
import {useSong} from "@/store/modules/SongStore";
import { IsongRecord } from "./index";
const SongStore = useSong();
const audioPlayer = ref();
// 改变播放状态
const changeState = (status: boolean) => {
  SongStore.isPlayStatus = status;
  if (status) audioPlayer.value.play() && timeUpdate();
  if (!status) audioPlayer.value.pause();
};
// 播放结束进入下一首
const changeMusic = (status: string) => {
  SongStore.preOrNextSong = status;
};
// 当前播放时间
const timeUpdate = () => {
  SongStore.currentTime = audioPlayer.value.currentTime | 0;
  SongStore.sliderVal = (SongStore.currentTime / SongStore.playTime) * 100;
};
// 点击歌词，是否显示歌词
const showLyric = () => {
  SongStore.lyricActive = !SongStore.lyricActive;
};
// 修改滑块位置，获取最新播放时间
const handleSliderChange = (val: number) => {
  audioPlayer.value.pause();
  SongStore.sliderVal = val;
  console.log(SongStore.sliderVal);
  SongStore.currentTime = (SongStore.sliderVal / 100) * SongStore.playTime;
};
// 点击上一首
const preSong = () => {
  let currentIndex = SongStore.listRecord.findIndex(
    (item: any) => item.songId === SongStore.songId
  );
  let preItem: IsongRecord[] = SongStore.listRecord.slice(
    currentIndex - 1,
    currentIndex
  );
  SongStore.$patch({
    songId: preItem[0].songId,
    songName:  preItem[0].songName,
    playUrl:  preItem[0].playUrl,
    playTime:  preItem[0].playTime,
    cover:  preItem[0].cover,
    arNameString:  preItem[0].arNameString
  });
  console.log(currentIndex,preItem);
};
// 点击下一首
const nextSong = () => {
  let currentIndex = SongStore.listRecord.findIndex(
    (item: any) => item.songId === SongStore.songId
  );
  let nextItem: IsongRecord[] = SongStore.listRecord.slice(
    currentIndex+1,
    currentIndex+2
  );
  SongStore.$patch({
    songId: nextItem[0].songId,
    songName:  nextItem[0].songName,
    playUrl:  nextItem[0].playUrl,
    playTime:  nextItem[0].playTime,
    cover:  nextItem[0].cover,
    arNameString:  nextItem[0].arNameString
  });
};
</script>

<template>
  <audio
    autoplay
    ref="audioPlayer"
    :src="SongStore.playUrl"
    @play="changeState(true)"
    @ended="changeMusic('next')"
    @timeupdate="timeUpdate"
  ></audio>
  <div>
    <div class="flex w-full items-center">
      <n-space class="w-1/5">
        <n-image
          width="70"
          class="ml-5 rounded"
          :src="SongStore.cover"
          :preview-disabled="true"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-space vertical class="h-full" justify="space-around">
          <n-gradient-text type="info">
            {{ SongStore.songName }}
          </n-gradient-text>
          <n-gradient-text type="info">
            {{ SongStore.arNameString }}
          </n-gradient-text>
        </n-space>
      </n-space>
      <div class="flex flex-col w-3/5">
        <div class="flex flex-row w-full justify-center items-center">
          <n-icon size="15" @click="preSong">
            <PlaySkipBack />
          </n-icon>
          <n-icon
            size="25"
            class="ml-20 mr-20"
            @click="changeState(false)"
            v-show="SongStore.isPlayStatus"
          >
            <PauseCircleOutline />
          </n-icon>
          <n-icon
            size="25"
            class="ml-20 mr-20"
            @click="changeState(true)"
            v-show="!SongStore.isPlayStatus"
          >
            <CaretForwardCircleOutline />
          </n-icon>
          <n-icon size="15" class="mr-20" @click="nextSong">
            <PlaySkipForward />
          </n-icon>
          <span @click="showLyric">词</span>
        </div>
        <div class="flex flex-row w-full items-center">
          <span class="mr-2">{{ SongStore.handlerCurrentTime }}</span>
          <n-slider
            v-model:value="SongStore.sliderVal"
            :step="1"
            class="w-full"
            :on-update:value="handleSliderChange"
          />
          <span class="ml-2">{{ SongStore.handlerTime }}</span>
        </div>
      </div>
      <n-drawer
        v-model:show="SongStore.lyricActive"
        :width="200"
        :height="50"
        placement="top"
        :trap-focus="false"
        :block-scroll="false"
        to="#small-lyric"
        :native-scrollbar="false"
        @mousewheel.prevent
      >
        <Lyric></Lyric>
      </n-drawer>
      <div class="w-1/5 h-20 relative">
        <div class="w-full">
          <div class="relative" id="small-lyric"></div>
        </div>
        <div class="h-full flex justify-center items-center">123</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-drawer.n-drawer--top-placement) {
  top: -80px;
  // width:25rem;
}
:deep(.n-drawer-mask) {
  background-color: transparent;
}
.prevent-scroll{
  ::-webkit-scrollbar {
    width: 0;
    height: 10px;
  }
}
</style>
