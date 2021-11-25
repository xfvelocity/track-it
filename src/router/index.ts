import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../pages/dashboard/Dashboard.vue";
import AddWorkout from "../pages/add-workout/AddWorkout.vue";
import MealPrep from "../pages/meal-prep/MealPrep.vue";
import CreateMeal from "../pages/meal-prep/add-meal/create-meal/CreateMeal.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/add-workout",
    name: "Add Workout",
    component: AddWorkout,
  },
  {
    path: "/meal-prep",
    name: "Meal Prep",
    component: MealPrep,
  },
  {
    path: "/meal-prep/create-meal",
    name: "Create Meal",
    component: CreateMeal,
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
