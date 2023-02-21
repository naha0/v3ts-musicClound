/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 15:37:05
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-21 13:43:39
 * @FilePath: \v3ts1\src\store\modules\MainStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { store } from '@/store';
import { defineStore } from 'pinia';
import { getBanner, getPersonalized } from '@/service/index';
import { IBannerList,IPersonalized } from '@/models/main';
import { onError } from '@/utils/messages';

interface IMainStateProps {
  componentName:string,
  bannerList: IBannerList[];
  personalized:IPersonalized[];
}

export const useMainStore = defineStore({
  id: 'main',
  state: () =>
    ({
      componentName:'home',
      bannerList: [],
      personalized:[],
      
    } as IMainStateProps),
  getters: {},
  actions: {
    async onMainBannerAction() {
      try {
        const res: any = await getBanner();
        this.bannerList = res.banners;
      } catch (error) {
        onError(`${error}`);
      }
    },
    async onMainPersonalizedAction() {
      try {
        const res: any = await getPersonalized();
        this.personalized = res.result
      } catch (error) {
        onError(`${error}`);
      }
    },
  },
});

/** 在 setup 外使用 */
export function useMainStoreWidthOut() {
  return useMainStore(store);
}
