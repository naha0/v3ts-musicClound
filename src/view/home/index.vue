<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 15:23:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-21 16:01:37
 * @FilePath: \v3ts1\src\view\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-full h-full">
    <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      style="height: 240px"
      :show-dots="false"
      autoplay
      dot-type="dot"
      draggable
      trigger="hover"
    >
      <template v-for="(item, index) in mainStore.bannerList" :key="item.targetId">
        <n-carousel-item :style="{ width: '60%' }" class="relative">
          <img class="carousel-img" :src="item.imageUrl" />
          <span class="absolute -bottom-0 bg-blue -right-0 py-0.1 px-2 round leading-loose">{{
            item.typeTitle
          }}</span>
        </n-carousel-item>
      </template>
    </n-carousel>
    <n-space class="mt-10 mb-5" @click="goPlaylist">
      <span class="font-bold text-xl">推荐歌单</span>
      <n-icon size="20">
        <ChevronForward />
      </n-icon>
    </n-space>
    <n-grid :x-gap="12" :y-gap="8" :cols="5">
      <template v-for="(item, index) in mainStore.personalized" :key="index">
        <n-grid-item>
          <div class="image-text relative">
            <n-image class="w-full h-40 rounded" :src="item.picUrl" preview-disabled />
            <div class="h-10 mt-1">{{ item.name }}</div>
            <n-space class="absolute top-2 right-2">
              <n-icon size="20" color="#fff">
                <CaretForwardCircleOutline />
              </n-icon>
              <span class="text-white font-shadow">{{ formatNumUnit(item.playCount) }}</span>
            </n-space>
          </div>
        </n-grid-item>
      </template>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMain } from '@/hooks/useMainContent';
import { useMainStore } from '@/store/modules/MainStore';
import { ChevronForward, CaretForwardCircleOutline } from '@vicons/ionicons5';
import { formatNumUnit } from '@/utils/index';
import { useRouter } from 'vue-router';
const { mainHomeList, TABS_TYPE } = useMain();
const mainStore = useMainStore();
const router = useRouter();
const goPlaylist = () => {
  console.log(111);
  mainStore.componentName = 'Playlist';
  router.push({
    path:'/playlist'
  })
};

onMounted(() => {
  mainHomeList();
});
</script>

<style scoped lang="scss">
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}
.round {
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.image-text {
  height: 13rem;
  div {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }
  .font-shadow {
    text-shadow: 2px 1px 1px #000;
  }
}

:deep(.n-image img) {
  width: 100%;
}
</style>
