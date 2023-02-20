/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 16:29:47
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:43:22
 * @FilePath: \v3ts1\src\store\modules\MainStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { store} from '@/store';
import { defineStore } from "pinia";
import { IUserProfile,IUserPlayCategory } from '@/models/user'
import { getUserPlaylist } from '@/service/index'
import { onError } from '@/utils/messages'
import { renderIcon } from '@/utils/render'
import { QueueMusicFilled as MusicIcon } from '@vicons/material';


interface IUserStateProps{
    theme?:string;
    token?:string;
    profile:IUserProfile;
    userPlaylist:IUserPlayCategory[]
}

export const useUserStore = defineStore({
    id:'user', 
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
    } as IUserStateProps),
    getters: {
        getTheme:state => state.theme,
        getTextColor:state => state.theme == "darkTheme" ?  '#ec4141': '#5dc3fe',
        getBaseColor:state => state.theme == "darkTheme" ? 'ec4141' : '#d5d5d5'
    },
    actions: {
        async onUserPlaylistAction(userId:number){
            try {
                const res:any = await getUserPlaylist(userId)
                if(res.code === 200){
                    let newPlaylist = [{
                        name: '创建的歌单',
                        nameChildren: res.playlist.filter((item:any)=> item.userId === this.profile.userId)
                    },{
                        name: '收藏的歌单',
                        nameChildren: res.playlist.filter((item:any) => item.userId !== this.profile.userId)
                    }]
                    this.userPlaylist = newPlaylist.map((item:any) => {
                        return {
                          name:item.name,
                          nameChildren:item.nameChildren.map((item1: any) => {
                            return {
                              ...item1,
                              icon: renderIcon(MusicIcon),
                            }
                          })
                        }
                      });
                }
            } catch (error) {
                onError(`${error}`);
            }
        },
    }
})


/** 在 setup 外使用 */
export function useUserStoreWidthOut() {
    return useUserStore(store)
  }