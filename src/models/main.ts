/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 16:07:26
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-24 16:02:14
 * @FilePath: \v3ts1\src\models\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IUserProfile } from './user'
export interface IBannerList {
  imageUrl: string;
  typeTitle: string;
  targetId: number;
}
export interface IPersonalized {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}

export interface IComment{
  id:number;
  content:string;
  liked:boolean;
  likedCount:number;
  timerStr:string;
  user:IUserProfile
}
