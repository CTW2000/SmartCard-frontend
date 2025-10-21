import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dishes',
    name: 'DishManager',
    component: () => import('../views/DishManager.vue'),
  },
  {
    path: '/staff',
    name: 'StaffManagement',
    component: () => import('../views/StaffManager.vue'),
  },
  {
    path: '/dialog',
    name: 'SmartDialoge',
    component: () => import('../views/SmartDialoge.vue'),
  },
  {
    path: '/equipment',
    name: 'EquipmentManager',
    component: () => import('../views/EquipmentManager.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { hideChrome: true },
  },
  {
    path: '/createaccounts',
    name: 'CreateAccounts',
    component: () => import('../views/CreateAccounts.vue'),
    meta: { hideChrome: true },
  },
  {
    path: '/joinUs',
    name: 'JoinUs',
    component: () => import('../views/JoinUs.vue'),
    meta: { hideChrome: true },
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const allowList = ['Login', 'CreateAccounts', 'JoinUs']
  if (!isAuthenticated && !allowList.includes(to.name)) {
    return next({ name: 'Login' })
  }
  next()
})

export default router


