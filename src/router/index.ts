import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

import Dashboard from '@/views/dashboard/Dashboard.vue'
import Account from '@/views/account/Account.vue'
import SignInContainer from '@/views/account/components/SignInContainer.vue'
import MealPlan from '@/views/meal-plan/MealPlan.vue'
import Profile from '@/views/profile/Profile.vue'
import Shopping from '@/views/shopping/Shopping.vue'
import AddMeal from '@/views/meal-plan/add-meal/AddMeal.vue'
import Meals from '@/views/meal-plan/meals/Meals.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    children: [
      {
        path: 'sign-up',
        name: 'Sign up',
        component: SignInContainer,
        meta: {
          hideNav: true,
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: SignInContainer,
        meta: {
          hideNav: true,
        },
      },
    ],
  },
  {
    path: '/meal-plan',
    component: MealPlan,
    name: 'Meal Plan',
    children: [
      {
        path: 'meals',
        name: 'Meal Plan - Meals',
        component: Meals,
      },
      {
        path: 'add-meal',
        name: 'Meals - Add Meal',
        component: AddMeal,
        meta: {
          hideNav: true,
        },
      },
    ],
  },

  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
  },
  {
    path: '/shopping',
    component: Shopping,
    name: 'Shopping',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `Track IT - ${String(to.name)}`
  store.commit('setLoading', null)

  const isLoggedin: boolean = store.getters.getUser?.uid
  const isLogInPage: boolean = to.name === 'Login' || to.name === 'Sign up'

  if (isLoggedin) {
    if (isLogInPage) {
      next('/')
    } else {
      next()
    }
  } else {
    if (isLogInPage) {
      next()
    } else {
      next('/account/login')
    }
  }
})

export default router
