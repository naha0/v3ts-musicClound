<template>
  <div
    class="relative overflow-auto w-full"
    :style="{ height: `${viewHeight}px` }"
    @scroll="scrollVL"
    ref="listHeight"
  >
    <div
      class="absolute w-full"
      :style="{ height: `${readyHeight}px`, transform: `translateY(${topHeight}px)` }"
    >
      <template v-for="(item, index) in newData" :key="index">
        <div :style="{ height: `${itemHeight}px` }" class="mb-5">
            <slot :data="item"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, onMounted, computed } from 'vue';
const props = defineProps({
  commentData: {
    type: Array as any,
    required: true,
  },
  itemHeight: {
    type: Number,
    required: false,
    default: () => 20,
  },
});

const listHeight = ref();
// list的真实高度
const readyHeight = ref();
readyHeight.value = computed(()=>props.itemHeight * props.commentData.length);
// 视口高度
const viewHeight = ref<number>(0);
// 视口下的item数量
const viewItem = computed(() => Math.ceil(viewHeight.value / props.itemHeight));
const startIndex = ref(0);
const endIndex = ref(0);
const topHeight = ref(0);

onMounted(() => {
  // 获取视图的高度
  viewHeight.value = window.innerHeight - 245;
});

const scrollVL = () => {
  // 获取滚动的高度
  topHeight.value = listHeight.value.scrollTop;
};

const newCommentData = ref([...props.commentData]);
const newData = ref<any[]>([]);
watchEffect(() => {
  // 获取startIndex
  startIndex.value = Math.floor(topHeight.value / props.itemHeight);
  // 获取endIndex
  endIndex.value = startIndex.value + viewItem.value;
  // 获取视口下的item
  newData.value = newCommentData.value.slice(startIndex.value, endIndex.value);
});
</script>

<style lang="scss" scoped></style>
