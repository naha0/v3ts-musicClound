/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2022-12-31 10:04:25
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-19 14:38:36
 * @FilePath: \v3ts1\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store/index';
import router from './router/index'
import hyRequest from './service/api';
import './index.css'

async function bootstrap() {
    const app = createApp(App)   
    // 挂载状态管理
    setupStore(app);
    
    app.mount('#app',true)
}

void bootstrap()