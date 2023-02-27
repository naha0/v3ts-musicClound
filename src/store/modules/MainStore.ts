/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 15:37:05
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 15:55:21
 * @FilePath: \v3ts1\src\store\modules\MainStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { store } from '@/store';
import { defineStore } from 'pinia';
import { getBanner, getPersonalized, getTopPlayListTags, getPlaylistDetail, getPlaylistComment } from '@/service/index';
import { IBannerList, IPersonalized, IComment } from '@/models/main';
import { ILsitPlay } from '@/models/play';
import { onError } from '@/utils/messages';

interface IMainStateProps {
  componentName: string;
  bannerList: IBannerList[];
  personalized: IPersonalized[];
  topPlatListTag: [];
  playlistDetail: ILsitPlay[];
  playlistComment: IComment[]
}

export const useMainStore = defineStore({
  id: 'main',
  state: () =>
    ({
      componentName: 'home',
      bannerList: [],
      personalized: [],
      topPlatListTag: [],
      playlistDetail: [],
      playlistComment:[]
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
        this.personalized = res.result;
      } catch (error) {
        onError(`${error}`);
      }
    },
    async onMainTopPlayListTags() {
      try {
        const res: any = await getTopPlayListTags();
        this.topPlatListTag = res.tags;
      } catch (error) {
        onError(`${error}`);
      }
    },
    async onMainPlaylistDetail(id: string) {
      try {
        const res: any = await getPlaylistDetail(id);
        this.playlistDetail = res.playlist.tracks;
      } catch (error) {
        onError(`${error}`);
      }
    },
    async onMainPlaylistCommentAction(id:string){
      try {
        const res:any = await getPlaylistComment(id)
        this.playlistComment = res.data.comments
      } catch (error) {
        onError(`${error}`)
      }
    }
  },
});

/** 在 setup 外使用 */
export function useMainStoreWidthOut() {
  return useMainStore(store);
}
