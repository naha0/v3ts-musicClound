<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-21 15:30:13
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-27 21:37:57
 * @FilePath: \v3ts1\src\view\playlist\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { onMounted, ref, nextTick, watch } from 'vue';
import { useMain } from '@/hooks/useMainContent';
import { useMainStore } from '@/store/modules/MainStore';
import { IPlayTag } from '@/models/main';
import { ChevronForward } from '@vicons/ionicons5';

const { mainPlaylist } = useMain();
const MainStore = useMainStore();
mainPlaylist();
const newTags = ref<any>([]);
const categoryList = [
  {
    category: 0,
    name: '语种',
    disabled: false,
  },
  {
    category: 1,
    name: '风格',
    disabled: false,
  },
  {
    category: 2,
    name: '场景',
    disabled: false,
  },
  {
    category: 3,
    name: '情感',
    disabled: false,
  },
  {
    category: 4,
    name: '主题',
    disabled: false,
  },
];
const tagList = [
  {
    name: '华语',
  },
  {
    name: '流行',
  },
  {
    name: '摇滚',
  },
  {
    name: '民谣',
  },
  {
    name: '电子',
  },
  {
    name: '另类/独立',
  },
  {
    name: '轻音乐',
  },
  {
    name: '综艺',
  },
  {
    name: '影视原生',
  },
  {
    name: 'ACG',
  },
];
const tagValue = ref();
const tagsClick = (item: IPlayTag) => {
  console.log(item);
  tagValue.value = item.name;
};
const showCard = ref(false);
const isShowCard = () => {
  showCard.value = !showCard.value;
};
const tagListClick = (item:any) => {
  tagValue.value = item.name;
}
onMounted(() => {
  nextTick(() => {
    console.log(MainStore.topPlatListTag, 'tags');
    const tags = MainStore.topPlatListTag.reduce((pre: any, cur: any) => {
      if (pre[cur.category]) {
        pre[cur.category].push(cur);
      } else {
        pre[cur.category] = [cur];
      }
      return pre;
    }, {});
    Object.values(tags).map((item: any) => newTags.value.push(item));
    newTags.value = newTags.value.map((item: any, index: any) => {
      let option: IPlayTag[] = [];
      if (index === categoryList[index].category) {
        item.forEach((item1: any) => {
          option.push({
            name: item1.name,
            value: item1.id,
            disabled: true,
          });
        });

        option.unshift(categoryList[index]);
      }
      return option;
    });
    console.log(newTags);
  });
});
watch(
  () => tagValue,
  newValue => {
    console.log(newValue);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="flex justify-between items-center">
    <n-space>
      <n-button round icon-placement="right" @click="isShowCard">
        {{ tagValue || '华语' }}
        <template #icon>
          <n-icon>
            <ChevronForward />
          </n-icon>
        </template>
      </n-button>
    </n-space>
    <n-space>
      <template v-for="(item,index) in tagList" :key="index">
        <span class="mr-5 px-2 inline-block w-15 rounded-sm text-center" :class="{ 'active': item.name == tagValue }" @click="tagListClick(item)">{{ item.name }}</span>
      </template>
    </n-space>
  </div>
  <n-card v-show="showCard">
    <template v-for="item in newTags">
      <div class="my-2">
        <template v-for="item1 in item">
          <n-tag
            class="p-5 mr-2"
            :disabled="!item1.disabled"
            :bordered="false"
            @click="tagsClick(item1)"
            :type="item1.name === tagValue ? 'info' : undefined"
            >{{ item1.name }}</n-tag
          >
        </template>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss" scoped>
.active {
  background-color: #5dc3fe;
  border-radius: 0.5rem;
}
</style>
