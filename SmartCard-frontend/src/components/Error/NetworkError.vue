<template>
  <div class="w-full h-full bg-white flex items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <img :src="networkFailIcon" alt="Network Error" class="w-auto h-auto max-w-md" />
    </div>
  </div>
</template>

<script setup>
import networkFailIcon from '../../../Resource/Equipment/networkFail.svg'
</script>

<style scoped>
</style>

