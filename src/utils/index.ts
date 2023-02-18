/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-14 16:28:35
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-16 21:07:16
 * @FilePath: \v3ts1\src\utils\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 补00
export function formatZero(num:number,len:number) {
    console.log(num,len);
    if (String(num).length > len) return num
	  return (Array(len).join(0) + num).slice(-len)
}
// 时间戳转换为00：00
export function formatSongTime(val:number) {
    let m = Math.floor(val / 60)
    let s = Math.round(val % 60)
    m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
    return `${m}:${s}`
}