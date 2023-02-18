/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2022-12-31 10:04:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-18 22:44:13
 * @FilePath: \v3ts1\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router/index'
import hyRequest from './service/api';
import './index.css'
const pinia = createPinia()
const app = createApp(App)


app.use(router).use(pinia).mount('#app')
