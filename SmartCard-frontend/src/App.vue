<template>
  <div id="app" class="h-screen w-screen overflow-auto">
    <header v-if="!hideChrome" class="sticky top-0 z-40 bg-white/90 border-b border-black/5 backdrop-blur-md saturate-125 ">
      <div class="w-full m-0 px-4 py-2 grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <div class="justify-self-start"><BrandButton /></div>
        <div class="flex justify-center"><Searchbar @search="onSearch" /></div>
        <div class="inline-flex items-center gap-2 justify-self-end mr-6">
          <Notification />
          <UserAvatar name="Alice Doe" />
        </div>
      </div>
    </header>
    <div v-if="!hideChrome" class="flex min-h-[calc(100vh-64px)] bg-[#F4F6F9] ">
      <Navbar />
      <main class="flex-1 min-w-0 ">
        <router-view />
      </main>
    </div>
    <div v-else >
      <router-view />
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
  computed: {
    hideChrome() {
      return this.$route?.meta?.hideChrome === true;
    },
  },
  methods: {
    onSearch(q) {
      this.$router.push({ name: 'Home', query: { q } })
    },
  },
}
</script>

<style scoped>
</style>