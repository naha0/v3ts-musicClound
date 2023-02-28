/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 15:36:26
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-27 20:59:43
 * @FilePath: \v3ts1\src\hooks\useMainContent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMainStoreWidthOut } from '@/store/modules/MainStore';
import { markRaw } from 'vue';
import Home from '@/view/home/index.vue';
import Customized from '@/view/customized/index.vue';
import Playlist from '@/view/playlist/index.vue';
const MainStore = useMainStoreWidthOut();

export const useMain = () => {
  const TABS_TYPE = [
    {
      name: '个性推荐',
      componentName: 'home',
      component: markRaw(Home),
    },
    {
      name: '专属定制',
      componentName: 'customized',
      component: markRaw(Customized),
    },
    {
      name: '歌单',
      componentName: 'playlist',
      component: markRaw(Playlist),
    },
  ];
  const mainHomeList = () => {
    MainStore.onMainBannerAction();
    MainStore.onMainPersonalizedAction();
  };
  const mainPlaylist = () => {
    MainStore.onMainTopPlayListTags();
  };
  
  return {
    TABS_TYPE,
    mainHomeList,
    mainPlaylist
  };
};
