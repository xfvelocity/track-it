import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/components/account/SignInContainer.vue'),
    children: [
      {
        path: 'sign-up',
        name: 'Sign up',
        component: () => import('@/views/account/SignUp.vue'),
        meta: {
          hideNav: true,
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/account/LogIn.vue'),
        meta: {
          hideNav: true,
        },
      },
    ],
  },
  {
    path: '/',
    name: 'Meal Plan',
    component: () => import('@/views/meal-plan/Meals.vue'),
  },
  {
    path: '/add-meal',
    component: () => import('@/views/meal-plan/add-meal/AddMealContainer.vue'),
    meta: {
      hideNav: true,
    },
    children: [
      {
        path: '',
        name: 'Meals - Add Meal',
        component: () => import('@/views/meal-plan/AddMeal.vue'),
      },
      {
        path: 'create-meal',
        name: 'Meals - Create meal',
        component: () => import('@/views/meal-plan/CreateMeal.vue'),
      },
      {
        path: 'add-ingredient',
        name: 'Meals - Add ingredient',
        component: () => import('@/views/meal-plan/AddIngredient.vue'),
      },
    ],
  },
  {
    path: '/shopping',
    component: () => import('@/views/shopping/Shopping.vue'),
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
