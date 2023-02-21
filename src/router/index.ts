/*
 * @Author: naha0 780400335@qq.com
 * @Date: 2023-01-06 11:46:36
 * @LastEditors: naha0 780400335@qq.com
 * @LastEditTime: 2023-02-21 10:08:24
 * @FilePath: \v3ts1\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory,RouteRecordRaw } from "vue-router";

const routes:RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/view/home/index.vue")
  },
  {
    path: "/customized",
    name: "Customized",
    component: () => import("@/view/customized/index.vue")
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: () => import("@/view/playlist/index.vue")
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
