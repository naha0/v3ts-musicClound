import {store} from '@/store';
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

export const useMain = defineStore({
    id:'main', 
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


/** 在 setup 外使用 */
export function useMainStoreWidthOut() {
    return useMain(store)
  }