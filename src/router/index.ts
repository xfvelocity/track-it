import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../pages/dashboard/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `Track IT - ${String(to.name)}`;
  next();
});

export default router;
