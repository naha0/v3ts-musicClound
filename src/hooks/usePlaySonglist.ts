/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-19 20:54:55
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 15:14:25
 * @FilePath: \v3ts1\src\hooks\usePlaySonglist.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useSongStoreWidthOut } from '@/store/modules/SongStore'
import { useMainStoreWidthOut } from '@/store/modules/MainStore';

const SongStore = useSongStoreWidthOut()
const MainStore = useMainStoreWidthOut()

export const usePlay = () => {
    const playListRecord = (value:any,id:number) => {
        SongStore.onSongSuggestAction(id)
    }
    const playListDetail = async(id:string) => {
        console.log(id);
        await MainStore.onMainPlaylistDetail(id)
    }
    const playlistComment = async(id:string) => {
        console.log(id);
        await MainStore.onMainPlaylistCommentAction(id)
      }
    return {
        playListRecord,
        playListDetail,
        playlistComment
    }
}