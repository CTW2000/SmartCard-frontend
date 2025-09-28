<template>
  <aside class="sidebar">
    <nav class="nav">
      <router-link to="/" class="item" exact>总览</router-link>
      <router-link to="/dialog" class="item">智能对话</router-link>
      <router-link to="/equipment" class="item">设备管理</router-link>
      <router-link to="/dishes" class="item">菜品管理</router-link>
      <router-link to="/staff" class="item">员工管理</router-link>
      <router-link to="/steam" class="item">投流管理</router-link>
    </nav>
  </aside>
</template>

<script>
export default { name: 'Navbar' }
</script>

<style scoped>
/* tokens from design.json */
.sidebar {
  --brand-600: #D94447;
  --brand-700: #A92E31;
  --neutral-0: #FFFFFF;
  --neutral-50: #F4F6F9;
  --neutral-500: #656665;
  --neutral-900: #0E1116;
  --overlay-border: rgba(0,0,0,0.06);
  width: 240px;
  background: var(--neutral-0);
  border-right: 1px solid var(--overlay-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

/* brand moved to top bar as BrandButton */

.nav { padding: 8px; display: flex; flex-direction: column; gap: 8px; }
.item { height: 40px; border-radius: 10px; display: flex; align-items: center; padding: 0 12px; color: var(--neutral-900); text-decoration: none; }
.item.router-link-active { background: #FCEDEE; color: var(--brand-700); box-shadow: inset 3px 0 0 #D94447; }

</style>

