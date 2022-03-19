import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

import Dashboard from '@/views/dashboard/Dashboard.vue'

// meal prep
import MealPrep from '@/views/meal-prep/MealPrep.vue'
import CreateMeal from '@/views/meal-prep/create-meal/CreateMeal.vue'
import AddMeal from '@/views/meal-prep/add-meal/AddMeal.vue'
import MealPlan from '@/views/meal-prep/meal-plan/MealPlan.vue'

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
        name: 'Meal Plan',
        component: MealPlan,
      },
      {
        path: 'add-meal',
        name: 'Add Meal',
        component: AddMeal,
      },
      {
        path: 'add-meal/create-meal',
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
