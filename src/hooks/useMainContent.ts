/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-20 15:36:26
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 16:00:20
 * @FilePath: \v3ts1\src\hooks\useMainContent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMainStoreWidthOut } from '@/store/modules/MainStore'
const MainStore = useMainStoreWidthOut()

export const useMain = () => {
    const mainBannerList = () =>{
        MainStore.onUserBannerAction()
    }
    return {
        mainBannerList
    }
}