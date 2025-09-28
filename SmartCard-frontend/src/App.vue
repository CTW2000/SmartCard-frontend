<template>
  <div id="app">
    <header class="topbar">
      <div class="top-inner">
        <div class="left"><BrandButton /></div>
        <div class="center"><Searchbar @search="onSearch" /></div>
        <div class="actions">
          <Notification />
          <UserAvatar name="Alice Doe" />
        </div>
      </div>
    </header>
    <div class="app-layout">
      <Navbar />
      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
  
</template>

<script>
import Navbar from './components/Navbar.vue';
import Searchbar from './components/Searchbar.vue';
import BrandButton from './components/BrandButton.vue';
import Notification from './components/Notification.vue';
import UserAvatar from './components/UserAvatar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Searchbar,
    BrandButton,
    Notification,
    UserAvatar,
  },
  methods: {
    onSearch(q) {
      this.$router.push({ name: 'Home', query: { q } })
    },
  },
}
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255,255,255,0.90);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  -webkit-backdrop-filter: blur(8px) saturate(1.2);
  backdrop-filter: blur(8px) saturate(1.2);
}
.top-inner {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 8px 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
}
.center { display: flex; justify-content: center; }
.left { justify-self: start; }
.actions { display: inline-flex; align-items: center; gap: 8px; justify-self: end; margin-right: 24px; }

.app-layout {
  display: flex;
  min-height: calc(100vh - 64px);
  background: #F4F6F9; /* tokens.layout.surfaces.appBg */
}

.app-content {
  flex: 1;
  min-width: 0;
}
</style>