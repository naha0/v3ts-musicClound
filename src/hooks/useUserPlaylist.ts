/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-18 20:51:57
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:45:15
 * @FilePath: \v3ts1\src\hooks\useUserPlaylist.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useUserStoreWidthOut } from '@/store/modules/UserStore'
const UserStore = useUserStoreWidthOut()

export const useUser = () => {
    const userHPlayList = async () => {
        if(UserStore.profile.userId){
            return await UserStore.onUserPlaylistAction(UserStore.profile.userId)
        }
    }
    return {
        userHPlayList,
    }
}