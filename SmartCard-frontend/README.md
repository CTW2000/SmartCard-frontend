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
| `LICENSE` | 项目许可。 |
| `src/` | 核心业务代码，详解见下文。 |

### `src` 目录拆解

- `main.js`：创建 Vue 实例，挂载全局路由与 Tailwind 样式，等待路由就绪再 `mount` 保证导航守卫逻辑先执行。
- `App.vue`：应用外壳，内置顶部工具条与侧边导航。依据路由 `meta.hideChrome` 控制登录/注册页是否隐藏 Chrome UI。接入 `useNetworkError()`，在任何 POST 请求失败后展示 `components/Error/NetworkError.vue`。
- `assets/`
  - `tailwind.css`：集中声明 CSS 变量与暗色主题，导入 Tailwind 内联主题。
  - `fonts/`：备用字体文件。
- `router/index.js`：定义全部页面路由，含任务详情动态参数与 `beforeEach` 守卫（未登录则强制跳转登录页，`meta.hideChrome` 白名单用于登录/注册/JoinUs）。
- `composables/useNetworkError.js`：提供全局响应式状态 `showNetworkError` 与 setter，供拦截器与 `App.vue` 使用。
- `httpClient/`
  - `paths.js`：维护所有后端 API 路径常量（用户、菜品、任务、聊天、设备等）。
  - `client.js`：axios 实例 + 响应拦截器，内置 `postStoredCredentials`、`postForm`、`postMultipart`、`getRequest` 以及 `streamChat`（原生 fetch 实现的增量消息流）。
- `components/General/`：顶层 UI 构件（`Navbar`、`Searchbar`、`BrandButton`、`Notification`、`UserAvatar`、`ScoreCard` 等）。搜索框会把查询跳转到 `SmartDialoge` 并携带 `q` 参数。
- `components/Error/NetworkError.vue`：POST 请求失败后的占位页，显示 Resource 中的网络错误插画。
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
| `Home.vue` | 门店概览：调用 `PATHS.MANAGE_INDEX` 获取店长/员工评分、菜品差评率、预警、差评榜、任务列表，并组合 `ScoreCard`、`LineChart`、`BadDish`、`TaskPanel`、`StaffFormHome`。 |
| `Login.vue` | 登录页，支持“记住密码”、URL token 自动登录、错误提示。登录成功后缓存 token/账户信息到 `localStorage` 并跳转总览。 |
| `CreateAccounts.vue` | 门店注册表单，提交手机号/密码/门店名/邀请码，强制勾选隐私协议后调用 `PATHS.REGISTER`。 |
| `JoinUs.vue` | 预留的招商页，占位文案“正在开发中”，并通过路由 `meta.hideChrome` 隐藏 Chrome UI。 |
| `DishManager.vue` | 菜品投流页面：包含趋势图（`lineChartMenu`）、差评榜、双列排行，同时提供跳转到菜单详情的入口。 |
| `MenuDetail.vue` | 菜单全量管理：按“全部/新菜/热销/已下架”分类筛选，支持搜索、批量选择、分组打标、Excel 批量上传、手动录菜、批量删除。利用 `postForm(PATHS.DISH_LIST)` 拉取分页数据、`postMultipart(PATHS.DISH_UPLOAD_EXCEL)` 上传。 |
| `StaffManager.vue` | 员工数据 + 表格操作：展示平均分、差评原因，`StaffForm` 支持编辑/新增/批量导入，点击行可弹出 `staffReport` 查看反馈。 |
| `EquipmentManager.vue` | 设备与人员绑定看板：按组织/分组展示 `PersonCard`，支持新增组、重命名、删除、分页加载、添加/编辑设备、绑定员工、批量操作，所有写操作通过 `PATHS.DEVICE_*` 完成。 |
| `TaskCenter.vue` | 任务中心：列表筛选（全部/品牌方/门店 + 进行中/历史），分页控制，创建新任务弹窗，任务卡片支持跳转详情、更新状态，所有数据来自 `PATHS.TASK_LIST`、`PATHS.TASK_TYPE_LIST`。 |
| `SpecificTasks.vue` | 任务详情：展示单条任务的菜品推荐/目标、员工完成情况（`StaffTaskComplete`），支持“任务作废”（`PATHS.TASK_UPDATE_STATUS`）。 |
| `SmartDialoge.vue` | 智能对话中枢：融合首登欢迎态、聊天区、AI/用户消息展示、消息选择/批量导出/分享、历史会话侧栏和 FAQ 快捷卡。`streamChat` 用于流式获取 AI 回复；可导出文档、分享图表或复制链接；支持 `HistoryChat` 组件载入指定 session。 |
| `HistoryDialogue.vue` | 对话历史页：分页调用 `PATHS.SESSION`，按“今天/七天内/30 天内”分组展示，会话卡片可跳回 `SmartDialoge` 并携带 `session_id`。 |

---

## 全局交互与状态

- **身份态管理**：登录、注册成功后把 `token`、`currentAccount`、`currentPassword` 存入 `localStorage`。`router.beforeEach` 会在访问非白名单路由时检查 token。
- **网络异常提示**：`httpClient/client.js` 的响应拦截器在 POST 失败时调用 `setNetworkError(true)`，`App.vue` 根据该状态覆盖 `router-view`。
- **任务/菜品/设备 CRUD**：统一通过 `postForm` 发送 `application/x-www-form-urlencoded` 数据；上传 Excel/图片时改用 `postMultipart` 保留 multipart 边界。
- **智能对话**：`streamChat` 基于 `fetch` 读取 `ReadableStream`，逐行解析响应，配合组件内的 `onChunk/onComplete` 回调实现实时渲染；`HistoryChat`、`HistoryDialogue` 通过 `PATHS.SESSION` 获取历史。

---

## 构建与发布

1. `npm run build` 会生成 `dist/`（已开启 `build.sourcemap`，方便线上排查）。
2. 将 `dist/` 部署到任意静态服务器（Nginx/OSS/CDN），并通过环境变量注入正确的 `VITE_BASE_URL`。
3. 生产环境建议在反向代理层配置 HTTPS 并放行 `/api/*`，以匹配 `PATHS` 中的接口片段。

---

## 调试提示

- **素材路径**：全部 SVG/PNG 位于 `Resource/`，按功能区分子目录，组件直接 `import`。
- **别名**：使用 `@/components/...`、`@/views/...` 等写法可以减少相对路径。
- **IDE 支持**：推荐 VS Code + Volar（需禁用 Vetur）获得最佳 `<script setup>` 体验。
- **常见问题**
  - 没有 token：`router` 会把你重定向到 `/login`。
  - POST 失败：`NetworkError` 覆盖视图，刷新或检查后端状态即可。
  - 流式聊天无响应：`streamChat` 在 `catch` 中亦会触发网络错误提示，详细日志请查浏览器控制台。

---

如需扩展新模块，可先在 `src/httpClient/paths.js` 补充接口，再在 `src/router/index.js` 注册页面并在 `components/General/Navbar.vue` 创建入口。欢迎根据业务需要加入 Pinia、国际化或自动化测试。
