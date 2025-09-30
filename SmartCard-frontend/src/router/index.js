import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/steam',
    name: 'SteamManager',
    component: () => import('../views/SteamManager.vue'),
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
  },
  {
    path: '/createaccounts',
    name: 'CreateAccounts',
    component: () => import('../views/CreateAccounts.vue'),
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


