// Get BASE_URL from environment variable, with fallback to default
// Vite exposes env variables with VITE_ prefix
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://192.168.0.135:3000';

// https://117.148.167.102:3000
// https://wanwu.chat/

export const PATHS = {
  REGISTER: '/api/users/register',
  LOGIN: '/api/users/login',
  MANAGE_INDEX: '/api/manage/index',
  STAFF_NAV: '/api/staff/nav',
  STAFF_EDIT: '/api/staff/edit',
  MANAGE_INDEX_STAFF: '/api/manage/index/staff',
  STAFF_SCORE_LIST: '/api/staff/score/list',
  STAFF_LIST: '/api/staff/list',
  STAFF_REPORT: '/api/staff/feedback',
  CONFIG_POSTION: '/api/config/postion',
  DISH_NAV_LIST: '/api/dish/nav/list',
  DISH_RANK: '/api/dish/rank',
  DISH_REPORT: '/api/dish/feedback',
  DISH_LIST: '/api/dish/list',
  DISH_EDIT: '/api/dish/edit',
  DISH_UPLOAD_EXCEL: '/api/dish/upload/excel',
  DEVICE_ORGANIZE_EDIT: '/api/device/organize/edit',
  DEVICE_GROUP_EDIT: '/api/device/group/edit',
  DEVICE_ORGANIZE_LIST: '/api/device/organize/list',
  DEVICE_EDIT: '/api/device/edit',
  TASK_LIST: '/api/task/list',
  TASK_TYPE_LIST: '/api/task/type/list',
  TASK_ADD: '/api/task/add',
  TASK_INFO: '/api/task/info',
  TASK_UPDATE_STATUS: '/api/task/update_status',
  SESSION: '/api/complete/session',
  CHAT_HISTORY: '/api/complete/chat/history',
};


