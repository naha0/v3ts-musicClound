/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-14 16:28:35
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-22 16:31:56
 * @FilePath: \v3ts1\src\utils\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 补00
export function formatZero(num: number, len: number) {
  console.log(num, len);
  if (String(num).length > len) return num;
  return (Array(len).join(0) + num).slice(-len);
}
// 时间戳转换为00：00
export function formatSongTime(val: number) {
  let m = Math.floor(val / 60);
  let s = Math.round(val % 60);
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}
// 数量转换单位
export function formatNumUnit(num: number) {
  if (num < 10000) {
    return String(num);
  } else if (num < 100000000) {
    return String(Math.floor(num / 10000)) + '万';
  } else {
    return String(num / 100000000) + '亿';
  }
}
// 歌手列表转换歌手
export function formatArList(list:any[]){
    return list.map((item:any) => item.name).join(' / ')
}
// path转换成组件名
export function  formatPathName(val:string) {
  return val.length === 1 ? val : val.slice(1)
}
