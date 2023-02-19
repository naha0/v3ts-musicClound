/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-19 20:54:55
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 21:04:15
 * @FilePath: \v3ts1\src\hooks\usePlaySonglist.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useSongStoreWidthOut } from '@/store/modules/SongStore'
import { getSongDetail, getMusicUrl, getLyric } from '@/service/songs';
const SongStore = useSongStoreWidthOut()

export const usePlay = () => {
    const playListRecord = async (value:any,id:any) => {
        console.log(1111);
        let res: any = await getSongDetail(id);
        let res1: any = await getMusicUrl(id);
        let res2: any = await getLyric(id);
        SongStore.$patch({
            songName: res.songs[0]?.name,
            arNameList: res.songs[0].ar,
            playUrl: res1.data[0].url,
            songId: res.songs[0].id,
            playTime: Math.round(res.songs[0].dt / 1000),
            lyric: res2.lrc.lyric,
            cover: res.songs[0].al.picUrl,
        });
        // SongStore.handlerListRecord()
    }
    return {
        playListRecord
    }
}