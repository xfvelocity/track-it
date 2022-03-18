import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import MealPrep from '@/views/meal-prep/MealPrep.vue'
import CreateMeal from '@/views/meal-prep/create-meal/CreateMeal.vue'
import AddMeal from '@/views/meal-prep/add-meal/AddMeal.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/meal-prep',
    component: MealPrep,
    children: [
      {
        path: '',
        name: 'Add Meal',
        component: AddMeal,
      },
      {
        path: 'create-meal',
        name: 'Create Meal',
        component: CreateMeal,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `Track IT - ${String(to.name)}`
  store.commit('setLoading', null)

  next()
})

export default router
