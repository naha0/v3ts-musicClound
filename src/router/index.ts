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
  {
    path: "/home1",
    name: "Home1",
    component: () => import("@/components/HelloWorld.vue")
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
