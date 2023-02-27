<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-23 14:22:53
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 18:39:48
 * @FilePath: \v3ts1\src\view\detail\components\DataComment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="relative bg-red-500 overflow-auto"
    :style="{ height: `${viewHeight}px` }"
    @scroll="scrollVL"
    ref="listHeight"
  >
    <div class="absolute">
      <template v-for="(item, index) in commentData">
        <div class="h-10">{{ index }}-----{{ item.content }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue';
const props = defineProps({
  commentData: {
    type: Array as any,
    required: true,
  },
});
const listHeight = ref<HTMLElement>();
// 视口高度
const viewHeight = ref<number>(0)
// list的真实高度
const readyHeight = ref()
const startIndex = ref(0);
const endIndex = ref(0);
const topHeight = ref(0);

// onMounted(() => {
  
//   viewHeight.value = listHeight.value?.clientHeight
//   console.log(viewHeight.value);
// });


// 获取全部的高度

const scrollVL = (e: Event) => {
  console.log(e.target);
};
</script>

<style lang="scss" scoped></style>
