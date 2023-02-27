/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-14 15:18:34
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:47:55
 * @FilePath: \v3ts1\src\store\SongStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { store } from '@/store';
import { defineStore } from "pinia";
import { formatSongTime, formatZero } from "@/utils";
import { getSongDetail, getMusicUrl, getLyric } from '@/service/index';
import { IArNameList, IListRecord } from '@/models/play'
import { onError } from '@/utils/messages';
interface ISongState {
    arNameList: IArNameList[],
    arNameString: string,
    songName: string,
    playUrl: string,
    songId: number,
    playTime: number,
    currentTime: number,
    sliderVal: number,
    lyric: string,
    cover: string,
    isPlayStatus: boolean,
    preOrNextSong: string,
    lyricActive: boolean,
    listRecord: IListRecord[]
}

export const useSongStore = defineStore({
    id: 'song',
    state: () => ({
        // 歌曲作者列表
        arNameList: [],
        arNameString: '',
        // 歌曲名称
        songName: '',
        // 歌曲地址
        playUrl: '',
        // 歌曲id
        songId: 0,
        // 歌曲时间
        playTime: 0,
        // 歌曲当前播放时间
        currentTime: 0,
        // 歌曲当前播放slider值
        sliderVal: 0,
        // 歌词
        lyric: '',
        // 封面图
        cover: '',
        // 播放状态
        isPlayStatus: false,
        // 播放上一首或者下一首
        preOrNextSong: '',
        // 小窗的歌词激活
        lyricActive: false,
        // 当前播放的歌曲列表记录
        listRecord: []
    } as ISongState),
    getters: {
        handlerAr(state) {
            return (state.arNameString = state.arNameList.map(item => item.name).join('、'))
        },
        handlerTime: state => formatSongTime(state.playTime),
        handlerCurrentTime: state => formatSongTime(state.currentTime),
        handlerLyric(state) {
            let lyricArr = state.lyric.split("[").slice(1)
            let lrcObj:any = {};
            lyricArr.forEach(item => {
                let arr = item.split(']')
                let m = parseInt(arr[0].split(":")[0])
                let s = parseInt(arr[0].split(":")[1]);
                arr[0] = m * 60 + s + '';
                if (arr[1] != "\n") {
                    // 去除歌词中的换行符
                    lrcObj[arr[0]] = arr[1];
                }
            });
            return lrcObj
        },
        handlerListRecord(state) {
                state.listRecord.push({
                    songId: state.songId,
                    songName: state.songName,
                    playUrl: state.playUrl,
                    playTime: state.playTime,
                    cover: state.cover,
                    arNameString: this.handlerAr
                })
            console.log(state.listRecord);
            return state.listRecord.reduce((pre,cur) => {
                pre.find((val:any) => val.songId === cur.songId) ? pre : [...pre,cur]
                return pre;
            },[])
        }        
    },
    actions: {
        async onSongSuggestAction(id:number){
            try {
                let res: any = await getSongDetail(id);
                let res1: any = await getMusicUrl(id);
                let res2: any = await getLyric(id);
                this.songName = res.songs[0]?.name
                this.arNameList = res.songs[0].ar
                this.playUrl = res1.data[0].url
                this.songId = res.songs[0].id
                this.playTime = Math.round(res.songs[0].dt / 1000)
                this.lyric = res2.lrc.lyric
                this.cover = res.songs[0].al.picUrl
            } catch(error) {
                onError(`${error}`);
            }
            
        },
    }
})

/** 在 setup 外使用 */
export function useSongStoreWidthOut() {
    return useSongStore(store)
}