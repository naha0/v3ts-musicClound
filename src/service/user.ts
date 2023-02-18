/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 16:26:22
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-17 15:32:18
 * @FilePath: \v3ts1\src\service\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import hyRequest from "@/service/api";
import qs from 'qs';
// 获取账号信息
export function getUserInfo() {
  return hyRequest.get({
    url:'/user/account'
  });
}
//获取用户详情
export function getUserDetail(uid:string) {
  return hyRequest.get({
    url:'/user/detail',
    params:{
      uid
    }
  })
}
// 签到
export function signIn() {
  return hyRequest.post('/daily_signin?timestamp=' + Date.now()+'&type=1');
}
//更新用户信息
export function updateUserInfo(data:{
  nickname: string,
  signature?: string,
  gender:number;
  birthday?: number|string,
  province?: number|string,
  city?: number|string,
}) {
  const params = qs.stringify({
    ...data,
    timestamp: Date.now()
  });
  return hyRequest.get('/user/update?'+params);
}
// 更新头像
export function updateUserAvatar(file: File, imgSize:number) {
  const formData = new FormData();
  formData.append('imgFile', file);
  const params = { timestamp: Date.now(), imgSize };
  const url = '/avatar/upload?'+qs.stringify(params);
  return hyRequest.post(
    url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }
  );  
}
// 发送/删除评论
export function sendComment(data: {
  t:number;///1 发送, 2 回复 0 删除
  type: number, //0: 歌曲1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number, //对应资源 id
  content: string, //要发送的内容
  commentId?: number//:回复的评论 id (回复评论时必填)
}) {
  const params = qs.stringify({
    ...data,
    timestamp: Date.now()
  });
  return hyRequest.get('/comment?'+params);
}
//获取用户歌单
export function getUserPlaylist(uid:number) {
  return hyRequest.get({
    url:'/user/playlist',
    params:{
      uid
    }
  });
}
// 给评论点赞
export function likeComment(data:{
  t:number;// 是否点赞 1 为点赞 0 为取消点赞
  cid: number, //评论 id
  type: number, //0: 歌曲1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number, //对应资源 id
}) {
  const params = qs.stringify({
    ...data,
    timestamp: Date.now()
  });
  return hyRequest.get('/comment/like?'+params);
}
// 获取登录状态
export function getLoginStatus() {
  return hyRequest.get('/login/status?timestamp='+Date.now());
}