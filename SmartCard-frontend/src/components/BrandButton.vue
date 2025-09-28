<template>
  <router-link to="/" class="brand-btn" aria-label="Go to dashboard">
    <span class="text">朱友和大排档</span>
  </router-link>
</template>

<script>
export default {
  name: 'BrandButton',
}
</script>

<style scoped>
.brand-btn {
  --brand-700: #A92E31;
  display: inline-flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
}
.text {
  color: var(--brand-700);
  font-weight: 600;
}
</style>

