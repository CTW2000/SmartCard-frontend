<template>
  <div class="development-page">
    <div class="development-message">正在开发中</div>
  </div>
</template>

<script>
export default {
  name: 'SmartDialoge',
}
</script>

<style scoped>
.development-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #F5F7FA;
}

.development-message {
  font-size: 32px;
  font-weight: 500;
  color: #666666;
  font-family: system-ui, sans-serif;
}
</style>
