# SmartCard 前端

一个基于 Vue 3 + Vite 的数字化餐饮运营看板，聚焦于门店运营总览、菜品管理、员工与设备管理以及智能对话中心。项目在桌面分辨率（≥1920px）下使用大量定制化组件与 Tailwind CSS 4 变量体系来还原 UI 设计稿。

---

## 技术栈与关键依赖

- **Vue 3 + `<script setup>` + Composition API**：编写全部业务组件与页面。
- **Vue Router 4**：负责路由守卫、动态参数与懒加载页面。
- **Vite 7**：开发/构建工具，集成 `@vitejs/plugin-vue`、`vite-plugin-vue-devtools` 与 `@tailwindcss/vite`。
- **Tailwind CSS 4**：通过 `src/assets/tailwind.css` 自定义 CSS 变量、暗色模式和圆角/阴影 tokens。
- **Axios + Fetch**：`src/httpClient/client.js` 封装统一的 REST/流式请求（含 POST 失败提示、token 注入）。
- **文档导出三件套**：`docx`、`pptxgenjs`、`xlsx`、`jspdf`，用于聊天结果/菜品/任务数据导出。

---

## 快速开始

1. **Node 版本**：`package.json` 要求 `^20.19.0 || >=22.12.0`。
2. **安装依赖**
   ```bash
   npm install
   ```
3. **开发调试**
   ```bash
   npm run dev
   ```
   默认监听 `http://localhost:5173`，可在 `.env` 中配置 `VITE_BASE_URL` 指向后端。
4. **生产构建与本地预览**
   ```bash
   npm run build
   npm run preview
   ```

> 📌 **环境变量**：HTTP 客户端默认读取 `VITE_BASE_URL` 作为 API 根地址，未配置时回退 `https://wanwu.chat/`。

---

## 目录与职责总览

| 路径 | 说明 |
| --- | --- |
| `index.html` | Vite 挂载点，挂载 `#app`。 |

| `package.json` / `package-lock.json` | 依赖、脚本与 Node 版本约束。 |

| `vite.config.js` | 配置插件、`@` 别名、sourcemap。 |

| `postcss.config.js` | 接入 `@tailwindcss/postcss`。 |

| `jsconfig.json` | 声明 `@/*` 到 `src/*` 的路径映射，方便 IDE 补全。 |

| `dist/` | 构建后的静态资源（不要手动修改）。 |

| `Resource/` | 设计稿导出的 SVG、PNG 等静态素材，按业务模块分文件夹（Dish、Staff、SmartDiague...）。 |


### `src` 目录拆解

- `assets/`
  - `tailwind.css`：集中声明 CSS 变量与暗色主题，导入 Tailwind 内联主题。

- `router/index.js`：定义全部页面路由

- `composables/useNetworkError.js`：提供全局响应式状态 showNetworkError


- `httpClient/`
  - `paths.js`：维护所有后端 API 路径常量（用户、菜品、任务、聊天、设备等）。
  - `client.js`：axios 实例 + 响应拦截器

- `components/General/`：顶层 UI 构件


- `components/Error/NetworkError.vue`：POST 请求失败后的占位页


- `components/Dish/`：菜品趋势折线图、差评榜卡片、排行列表、Excel/手动录入弹窗等。


- `components/Staff/`：员工信息表单、差评原因卡片、增删改弹窗、报告对话框。


- `components/TaskCenterComponents/`：任务卡片、任务面板、创建任务表单、菜品推荐卡、任务完成进度展示等。


- `components/Device/PersonCard.vue`：设备绑定卡片，支持编辑、删除、人员选择。


- `components/SmartChat/`：`HistoryChat`（侧边历史列表）与 `ExtractChat`（选中 AI 回复后导出/分享/ppt 生成面板）。


- `components/SmartChat/HistoryChat.vue` 与 `views/HistoryDialogue.vue` 配合，分别展示最新 5 条会话或全部会话（分页加载）。

---

## 业务页面（`src/views`）

| 视图 | 功能摘要 |
| --- | --- |
| `Home.vue` | 门店概览

| `Login.vue` | 登录页

| `CreateAccounts.vue` | 门店注册表单，提交手机号/密码/门店名/邀请码，强制勾选隐私协议后调用 `PATHS.REGISTER`。 |

| `JoinUs.vue` | 预留的招商页，占位文案“正在开发中”

| `DishManager.vue` | 菜品投流页面，同时提供跳转到菜单详情的入口。 |


| `MenuDetail.vue` | 菜单全量管理页面

| `StaffManager.vue` | 员工数据 + 表格操作

| `EquipmentManager.vue` | 设备与人员绑定看板：支持新增组、重命名、删除、分页加载、添加/编辑设备、绑定员工、批量操作。


| `TaskCenter.vue` | 任务中心


| `SpecificTasks.vue` | 任务详情：展示单条任务的菜品推荐/目标、员工完成情况


| `SmartDialoge.vue` | 智能对话页面


| `HistoryDialogue.vue` | 对话历史页


## 调试提示

- **素材路径**：全部 SVG/PNG 位于 `Resource/`，按功能区分子目录，组件直接 
