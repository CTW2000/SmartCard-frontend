import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
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
    path: '/menu-detail',
    name: 'MenuDetail',
    component: () => import('../views/MenuDetail.vue'),
  },
  {
    path: '/tasks/:task_id',
    name: 'SpecificTasks',
    component: () => import('../views/SpecificTasks.vue'),
    props: route => {
      let taskInfo = {}
      const raw = typeof route.query.taskInfo === 'string' ? route.query.taskInfo : ''
      if (raw) {
        try {
          taskInfo = JSON.parse(decodeURIComponent(raw)) || {}
        } catch (error) {
          console.warn('[Router] Failed to parse task info from query', error)
        }
      }
      return {
        task_id: route.params.task_id || '',
        taskInfo
      }
    },
  },
  {
    path: '/taskscenter',
    name: 'TaskCenter',
    component: () => import('../views/TaskCenter.vue'),
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


