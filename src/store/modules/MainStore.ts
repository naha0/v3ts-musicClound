/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 15:37:05
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:59:23
 * @FilePath: \v3ts1\src\store\modules\MainStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { store } from '@/store';
import { defineStore } from 'pinia';
import { getBanner } from '@/service/index'
import { IBannerList } from '@/models/main'

interface IMainStateProps{
    bannerList:IBannerList[]
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    bannerList:[]
  } as IMainStateProps),
  getters: {},
  actions: {
    async onUserBannerAction() {
      const res:any = await getBanner();
      this.bannerList = res.banners
    },
  },
});

/** 在 setup 外使用 */
export function useMainStoreWidthOut() {
  return useMainStore(store);
}
