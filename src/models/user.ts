/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-18 20:36:36
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 15:20:28
 * @FilePath: \v3ts1\src\models\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface IUserProfile{
    avatarUrl: string;
    nickname: string;
    userId: number;
}

export interface IUserPlaylist{
    name: string | null;
    id: number | null;
    coverImgUrl: string | null;
    userId:number | null;
    [propName:string]?:any;
}

export interface IUserPlayCategory{
    name: string | null;
    nameChildren:IUserPlaylist[]
}

export interface IUserPlaylistDetail extends IUserPlaylist{

}