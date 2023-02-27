/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 16:26:22
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 11:22:25
 * @FilePath: \v3ts1\src\service\songs.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import hyRequest from "@/service/api";

// 获取歌曲详情
export function getSongDetail(ids:number) {
  return hyRequest.get({
    url:'/song/detail',
    params:{
      ids
    }
  });
}
// 推荐新音乐
// export function getNewSong() {
//   return hyRequest.get('/personalized/newsong?limit=20');
// }
// // 新歌速递
// export function getTopSong(type: 0 | 7 | 96 |8 | 16=0) {
//   return hyRequest.get(`/top/song?type=${type}`);
// }
// // 获取歌手单曲可 获得歌手部分信息和热门歌曲
// export function getSingerSong(id: number) {
//   return hyRequest.get(`/artists?id=${id}`);
// }
// // 我喜欢的音乐列表
// export function getLikeList(uid: number) {
//   const query = qs.stringify({
//     uid,
//     timestamp: Date.now()
//   });
//   return hyRequest.get(`/likelist?${query}`);
// }
// // 获取音乐url
export function getMusicUrl(id:number) {
  return hyRequest.get({
    url:'/song/url',
    params:{
      id
    }
  })
}
// 获取歌词
export function getLyric(id:number) {
  return hyRequest.get({
    url:'/lyric',
    params:{
      id
    }
  });
}
// // 检查音乐是否可用
// export function checkMusic(id:string) {
//   return hyRequest.get('/check/music?id='+id);
// }
// 歌曲评论
export function getMusicComment(data:{
  id:string;
  limit?:number;
  offset?:number;
  before?:string;}) {
  const query = {
    timestamp: Date.now(),
    ...data
  }
  return hyRequest.get({
    url:'/comment/music',
    params:query
  });
}
// 喜欢音乐
// export function likeMusic(id:number, like:boolean) {
//   return hyRequest.get(`/like?id=${id}&like=${like}`); 
// }