import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user'

import SignInContainer from '@/views/account/components/SignInContainer.vue'
import Shopping from '@/views/shopping/Shopping.vue'
import AddMeal from '@/views/meal-plan/AddMeal.vue'
import Meals from '@/views/meal-plan/Meals.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => '/meal-plan/meals',
  },
  {
    path: '/account',
    name: 'Account',
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
  const userStore = useUserStore()
  const configStore = useConfigStore()
  document.title = `Track IT - ${String(to.name)}`

  configStore.loading.value = false

  const isLoggedin: boolean = userStore.user.uid
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
