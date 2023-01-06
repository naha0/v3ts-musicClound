import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/detail",
    name: "Detail",
    component: () => import("@/view/detail/index.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/view/home/index.vue")
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
