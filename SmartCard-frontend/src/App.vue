<template>
  <div id="app" class="min-h-screen w-full flex flex-col">
    <header v-if="!hideChrome" 
    class="sticky top-0 z-40 bg-white text-white rounded-tl-[50px] rounded-tr-[50px] min-w-[1810px] "
    >
      <div class="w-full m-0 px-6 py-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div class="justify-self-start"><BrandButton /></div>
        <div class="flex justify-center"><Searchbar /></div>
        <div class="inline-flex items-center gap-2 justify-self-end mr-6">
          <Notification />
          <UserAvatar name="Alice Doe" />
          <button
            type="button"
            class="relative w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
            aria-label="Logout"
            @click="handleLogout"
          >
            <img :src="logoutIcon" alt="Logout" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>



    <div class="flex-1 w-full ">
      <div v-if="!hideChrome" class="flex min-h-full ">
        <Navbar />
        
        <main class="flex-1 min-w-0 ">
          <NetworkError v-if="showNetworkError" />
          <router-view v-else />
        </main>
      </div>
      
      <div v-else class="flex-1 ">
        <NetworkError v-if="showNetworkError" />
        <router-view v-else />
      </div>

      
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNetworkError } from './composables/useNetworkError'

import Navbar from './components/General/Navbar.vue'
import Searchbar from './components/General/Searchbar.vue'
import BrandButton from './components/General/BrandButton.vue'
import Notification from './components/General/Notification.vue'
import UserAvatar from './components/General/UserAvatar.vue'
import NetworkError from './components/Error/NetworkError.vue'
import logoutIcon from '../Resource/Home/Logout.svg'

const route = useRoute()
const { showNetworkError } = useNetworkError()

// use for the login page and the register page
const hideChrome = computed(() => route?.meta?.hideChrome === true)

function handleLogout() {
  console.log('Logout clicked')
  // TODO: integrate actual logout logic
}
</script>

<style scoped>
</style>