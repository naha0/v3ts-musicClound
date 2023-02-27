<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-21 15:30:13
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-27 20:00:50
 * @FilePath: \v3ts1\src\view\playlist\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useMain } from '@/hooks/useMainContent';
import { useMainStore } from '@/store/modules/MainStore';
import { IPlayTag } from '@/models/main';
const { mainPlaylist } = useMain();
const MainStore = useMainStore();
mainPlaylist();
const newTags = ref<any>([]);
const categoryList = [
  {
    category: 0,
    name: '语种',
    disabled:false
  },
  {
    category: 1,
    name: '风格',
    disabled:false
  },
  {
    category: 2,
    name: '场景',
    disabled:false
  },
  {
    category: 3,
    name: '情感',
    disabled:false
  },
  {
    category: 4,
    name: '主题',
    disabled:false
  },
];
const tagValue = ref();

onMounted(() => {
  console.log(123);
  const tags = MainStore.topPlatListTag.reduce((pre: any, cur: any) => {
    if (pre[cur.category]) {
      pre[cur.category].push(cur);
    } else {
      pre[cur.category] = [cur];
    }
    return pre;
  }, {});
  console.log(tags);
  Object.values(tags).map((item: any) => newTags.value.push(item));
  console.log(newTags.value);
  newTags.value = newTags.value.map((item: any, index: any) => {
    console.log(item, index);
    let option: IPlayTag[] = [];
    if (index === categoryList[index].category) {
      console.log(item);
      item.forEach((item1: any) => {
        option.push({
          name: item1.name,
          value: item1.id,
          disabled:true
        });
      });

      option.unshift(categoryList[index]);
    }
    return option;
  });
  console.log(newTags);
});
</script>

<template>
  <div class="">
    <n-space>
      <n-button>
        {{ tagValue || '华语' }}
      </n-button>
    </n-space>
    <n-card>
      <template v-for="item in newTags">
      <div class="my-2">
        <template v-for="item1 in item">
          <n-tag class="p-5" :disabled="item.disabled">{{ item1.name }}</n-tag>
        </template>
      </div>
        
      </template>
    </n-card>
  </div>
</template>

<style lang="scss" scoped></style>
