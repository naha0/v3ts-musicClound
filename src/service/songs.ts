import qs from 'qs';
import hyRequest from "@/service/api";

// 获取歌曲详情
export function getSongDetail(ids:string) {
  return hyRequest.get({
    url:'/song/detail',
    params:{
      ids
    }
  });
}
// 推荐新音乐
export function getNewSong() {
  return hyRequest.get('/personalized/newsong?limit=20');
}
// 新歌速递
export function getTopSong(type: 0 | 7 | 96 |8 | 16=0) {
  return hyRequest.get(`/top/song?type=${type}`);
}
// 获取歌手单曲可 获得歌手部分信息和热门歌曲
export function getSingerSong(id: number) {
  return hyRequest.get(`/artists?id=${id}`);
}
// 我喜欢的音乐列表
export function getLikeList(uid: number) {
  const query = qs.stringify({
    uid,
    timestamp: Date.now()
  });
  return hyRequest.get(`/likelist?${query}`);
}
// 获取音乐url
export function getMusicUrl(id:string) {
  return hyRequest.get({
    url:'/song/url',
    params:{
      id
    }
  })
}
// 获取歌词
export function getLyric(id:string) {
  return hyRequest.get({
    url:'/lyric',
    params:{
      id
    }
  });
}
// 检查音乐是否可用
export function checkMusic(id:string) {
  return hyRequest.get('/check/music?id='+id);
}
// 歌曲评论
export function getMusicComment(data:{
  id:string;
  limit?:number;
  offset?:number;
  before?:string;}) {
  const query = qs.stringify({
    timestamp: Date.now(),
    ...data
  });
  return hyRequest.get('/comment/music?'+query);
}
// 喜欢音乐
export function likeMusic(id:number, like:boolean) {
  return hyRequest.get(`/like?id=${id}&like=${like}`); 
}