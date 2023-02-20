/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-19 13:47:29
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-20 15:48:17
 * @FilePath: \v3ts1\src\store\modules\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const allModules = import.meta.globEager('./*/index.ts')
// const modules = {} as any
// Object.keys(allModules:any).forEach((path) => {
//   const fileName = path.split('/')[1]
//   modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path]
// })

// export default modules
import {useUserStore} from './UserStore'
import {useSongStore} from './SongStore'

export default {
    useUserStore,
    useSongStore
}
