/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-18 21:33:44
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-22 11:41:35
 * @FilePath: \v3ts1\src\models\play.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface IArNameList{
    id:number;
    name:string;
    [propName: string]: any;
}

export interface IListRecord{
    songId:number;
    songName:string;
    playUrl:string;
    playTime:number;
    cover:string;
    arNameString:string;
}

export interface ILsitPlay{
    ar: IArNameList[];
    id: number;
    name: string;
    dt: string;
    al?: Object;
    arNameString?:any;
    alNameString?:'';
    [propName: string]: any;
}