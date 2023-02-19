/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-14 15:18:34
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 14:41:05
 * @FilePath: \v3ts1\src\store\SongStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {store} from '@/store';
import { defineStore } from "pinia";
import { formatSongTime,formatZero } from "@/utils";
import {IArNameList,IListRecord } from '@/models/play'

export interface ISongState{
    arNameList:IArNameList[],
    arNameString:string,
    songName:string,
    playUrl:string,
    songId:boolean,
    playTime:number,
    currentTime:number,
    sliderVal: number,
    lyric:string,
    cover:string,
    isPlayStatus:boolean,
    preOrNextSong:string,
    lyricActive:boolean,
    listRecord:IListRecord[]
}

export const useSong = defineStore({
    id:'song',
    state: () => ({
        // 歌曲作者列表
        arNameList:[],
        arNameString:'',
        // 歌曲名称
        songName:'',
        // 歌曲地址
        playUrl:'',
        // 歌曲id
        songId:0,
        // 歌曲时间
        playTime:0,
        // 歌曲当前播放时间
        currentTime:0,
        // 歌曲当前播放slider值
        sliderVal: 0,
        // 歌词
        lyric:'',
        // 封面图
        cover:'',
        // 播放状态
        isPlayStatus:false,
        // 播放上一首或者下一首
        preOrNextSong:'',
        // 小窗的歌词激活
        lyricActive:false,
        // 当前播放的歌曲列表记录
        listRecord:[]
    }),
    getters: {
        handlerAr(state){
            return  (state.arNameString = state.arNameList.map(item=>item.name).join('、'))
        },
        handlerTime:state=>formatSongTime(state.playTime),
        handlerCurrentTime:state=>formatSongTime(state.currentTime),
        handlerLyric(state){
            let lyricArr = state.lyric.split("[").slice(1)
            let lrcObj = {};
            lyricArr.forEach(item => {
                let arr =item.split(']')
                let m = parseInt(arr[0].split(":")[0])
                let s = parseInt(arr[0].split(":")[1]);
                arr[0] = m * 60 + s;
                if (arr[1] != "\n") {
                  // 去除歌词中的换行符
                  lrcObj[arr[0]] = arr[1];
                }
            });
            return lrcObj
        },
        handlerListRecord(state){
            state.listRecord.push({
                songId:state.songId,
                songName:state.songName,
                playUrl:state.playUrl,
                playTime:state.playTime,
                cover:state.cover,
                arNameString:this.handlerAr
            })
        }
    },
    actions: {
        
    }
})

/** 在 setup 外使用 */
export function useSongStoreWidthOut() {
    return useSong(store)
  }