<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-07 16:23:41
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-23 13:44:36
 * @FilePath: \v3ts1\src\components\LayOut\MainContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted, ref, watch, shallowRef } from 'vue';
import { useUser } from '@/hooks/useUserPlaylist';
import { useMain } from '@/hooks/useMainContent';
import { useUserStore } from '@/store/modules/UserStore.js';
import { useMainStore } from '@/store/modules/MainStore.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatPathName } from '@/utils/index';
import { usePlay } from '@/hooks/usePlaySonglist'

const router = useRouter();

const userStore = useUserStore();
const mainStore = useMainStore();
const { userPlaylist } = storeToRefs(userStore);
const { userHPlayList } = useUser();
const { TABS_TYPE } = useMain();
const { playListDetail } = usePlay()
defineProps<{
  getInverted: boolean;
}>();

let pathName = ref<string>('home')
let pathNameList = TABS_TYPE.map(item => item.componentName);
pathNameList.push('/');
let currentComponent = shallowRef(TABS_TYPE[0].component);
const updateMenu = (key: string, item: any) => {
  console.log(item);
  playListDetail(item.id)
  router.push({
    path:"/detail",
    query:{
      id:item.id
    }
  })
};
watch(
  () => mainStore.componentName,
  newValue => {
    let index = TABS_TYPE.findIndex(item => item.componentName === newValue);
    currentComponent.value = TABS_TYPE[index].component;
    router.push({
      path: '/' + TABS_TYPE[index].componentName,
    });
  },
  {
    immediate: true,
  }
);
watch(()=>router.currentRoute.value.path,(newValue)=>{
  pathName.value = formatPathName(newValue)
})

onMounted(() => {
  userHPlayList();
});
</script>

<template>
  <NLayout has-sider class="hidden-main">
    <NLayoutSider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
    >
      <NMenu
        :inverted="getInverted"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="userPlaylist"
        label-field="name"
        children-field="nameChildren"
        :on-update:value="updateMenu"
      />
    </NLayoutSider>

    <NLayoutContent ref="contentRef" content-style="padding: 24px;" :native-scrollbar="false">
      <div v-if="pathNameList.includes(pathName)">
        <NTabs type="bar" v-model:value="mainStore.componentName" default-value="Home">
          <template v-for="(item, index) in TABS_TYPE" :key="index">
            <NTabPane :name="item.componentName" :tab="item.name"></NTabPane>
          </template>
        </NTabs>
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>
.hidden-main {
  height: calc(100vh - 145px);
  overflow-x: clip;
}
:deep(.n-menu-item-content) {
  padding-left: 2rem !important;
}
</style>
