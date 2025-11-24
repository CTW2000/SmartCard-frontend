<template>
  
  <router-link
    to="/"
    class="inline-flex items-center gap-3 no-underline"
    aria-label="Go to dashboard"
  >
    <span class="inline-flex items-center justify-center">
      <img :src="brandLogo" alt="Brand logo" class="w-10 h-10 object-contain" />
    </span>
    <span class="inline-flex items-center">
      <img :src="brandName" alt="Brand name" class="h-8 object-contain" />
    </span>
  </router-link>
</template>

<script setup>
import brandLogo from '../../../Resource/Home/Brandlogo.svg'
import brandName from '../../../Resource/Home/brandname.svg'
</script>

<style scoped>
</style>

