import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware.js'
import axios from 'axios'
import { BASE_URL } from '@/utils/consts.js'
import { store } from '@/store/index.js'
const Home = () => import('@/pages/Home.vue')
const Login = () => import('@/pages/Login.vue')
const Register = () => import('@/pages/Register.vue')

const NotFound = () => import('@/pages/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
      layout: 'default'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
      layout: 'auth'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound',
    meta: { layout: 'default' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const refreshAuth = async () => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/refresh`)
    if (data) {
      return data
    }
  } catch (error) {
    throw new Error('Failed to refresh token')
  }
}

const fetchUserProfile = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/auth/profile`)
    if (data) {
      return data
    }
  } catch (error) {
    throw new Error('Failed to fetch user profile')
  }
}

router.beforeEach(async (to, from, next) => {
  await loadLayoutMiddleware(to)

  if (to.meta.requiresAuth) {
    try {
      await refreshAuth()
      const userData = await fetchUserProfile()
      store.commit('setUser', userData)
      store.commit('setIsAuth', true)
      next()
    } catch (error) {
      store.commit('logout')
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
