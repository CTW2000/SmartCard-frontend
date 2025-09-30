<template>
  <aside class="w-[240px] bg-white border-r border-black/5 flex flex-col h-screen sticky top-0">
    <nav class="p-2 flex flex-col gap-2">
      <router-link to="/" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link" exact>总览</router-link>
      <router-link to="/dialog" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link">智能对话</router-link>
      <router-link to="/equipment" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link">设备管理</router-link>
      <router-link to="/dishes" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link">菜品管理</router-link>
      <router-link to="/staff" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link">员工管理</router-link>
      <router-link to="/steam" class="h-10 rounded-[10px] flex items-center px-3 text-[#0E1116] no-underline router-link">投流管理</router-link>
    </nav>
  </aside>
</template>

<script>
export default { name: 'Navbar' }
</script>

<style scoped>
.router-link.router-link-active { background: #FCEDEE; color: #A92E31; box-shadow: inset 3px 0 0 #D94447; }
</style>

