<!--
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-07 16:23:41
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:55:38
 * @FilePath: \v3ts1\src\components\LayOut\MainContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted } from 'vue';
import { useUser } from '@/hooks/useUserPlaylist';
import { useMain } from '@/hooks/useMainContent'
import { useUserStore } from '@/store/modules/UserStore.js';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userPlaylist } = storeToRefs(userStore);
const { userHPlayList } = useUser();
const { mainBannerList } = useMain()

defineProps<{
  getInverted: boolean;
}>();

onMounted(() => {
  userHPlayList();
  mainBannerList()
});
</script>

<template>
  <n-layout has-sider class="hidden-main">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
    >
      <n-menu
        :inverted="getInverted"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="userPlaylist"
        label-field="name"
        children-field="nameChildren"
      />
    </n-layout-sider>
    <n-layout-content ref="contentRef" content-style="padding: 24px;" :native-scrollbar="false">
      <router-view />
      1231313
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss" scoped>
.hidden-main {
  height: calc(100vh - 145px);
  overflow-x: clip;
}
:deep(.n-menu-item-content){
  padding-left:2rem !important;
}
</style>
