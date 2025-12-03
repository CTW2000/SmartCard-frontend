<template>
  
  <router-link
    to="/"
    class="inline-flex items-center gap-0 no-underline"
    aria-label="Go to dashboard"
  >
    <span class="inline-flex items-center justify-center">
      <img :src="brandLogo" alt="Brand logo" class="w-18 h-18 object-contain" />
    </span>
    <span class="inline-flex items-center">
      <span class="text-neutral-900 text-3xl font-extrabold font-['Alibaba_PuHuiTi']">华兮终端</span>
    </span>
  </router-link>
</template>

<script setup>
import brandLogo from '../../../Resource/Home/Brandlogo.jpg'

</script>

<style scoped>
</style>

