import { useMain } from '@/store/MainStore';
/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 16:29:47
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-18 23:13:25
 * @FilePath: \v3ts1\src\store\MainStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import piniaStore from '@/store';
import { IMainStateProps } from './MainStore';
import { defineStore } from "pinia";
import {onError} from '@/utils/messages'
import {IUserProfile,IUserPlaylist} from '@/models/user'
import {getUserPlaylist} from '@/service/user'

export interface IMainStateProps{
    theme?:string;
    token?:string;
    profile:IUserProfile;
    userPlaylist?:IUserPlaylist[]
}

const useMain = defineStore('main', {
    state: () => ({
        // 主题
        theme: '',
        token: '',
        // 用户信息
        profile: {
            avatarUrl: '',
            nickname: '',
            userId: 0
        },
        // 用户歌单
        userPlaylist:[]
    } as IMainStateProps),
    getters: {
        getTheme:state => state.theme,
        getTextColor:state => state.theme == "darkTheme" ?  '#ec4141': '#5dc3fe',
        getBaseColor:state => state.theme == "darkTheme" ? 'ec4141' : '#d5d5d5'
    },
    actions: {
        async onUserPlaylistAction(userId:number){
            try {
                const res = await getUserPlaylist(userId)
                if(res.code === '200') this.userPlaylist = res.playlist
            } catch (error) {
                onError(`${error}`);
            }
        }
    }
})

// export default useMain
/** 在 setup 外使用 */
export function useMainStore() {
    return useMain(piniaStore)
  }