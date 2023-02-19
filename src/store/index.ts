/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-02-18 23:12:41
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 13:42:54
 * @FilePath: \v3ts1\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };