<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 15:23:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 18:53:16
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
      <template v-for="(item, index) in MainStore.bannerList" :key="item.targetId">
        <n-carousel-item :style="{ width: '60%' }" class="relative">
          <img class="carousel-img" :src="item.imageUrl" />
          <span class="absolute -bottom-2 bg-gray-400 -right-2 py-2 pr-4 pl-2 rounded-lg leading-loose">{{ item.typeTitle }}</span>
        </n-carousel-item>
        </template>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useMain } from '@/hooks/useMainContent';
import { useMainStore } from '@/store/modules/MainStore';
const { mainBannerList } = useMain();
const MainStore = useMainStore();
onMounted(() => {
  mainBannerList();
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
</style>
