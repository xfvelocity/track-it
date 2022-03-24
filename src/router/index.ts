import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

import Dashboard from '@/views/dashboard/Dashboard.vue'

import Account from '@/views/account/Account.vue'
import SignInContainer from '@/views/account/components/SignInContainer.vue'

import MealPlan from '@/views/meal-plan/MealPlan.vue'

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
      },
      {
        path: 'login',
        name: 'Login',
        component: SignInContainer,
      },
    ],
  },
  {
    path: '/meal-plan',
    component: MealPlan,
    name: 'Meal Plan',
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

  next()
})

export default router
