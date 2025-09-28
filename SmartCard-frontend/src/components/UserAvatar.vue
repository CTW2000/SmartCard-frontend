<template>
  <button class="avatar" aria-label="User menu" @click="$emit('click')">
    <span class="initials">{{ initials }}</span>
  </button>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    name: { type: String, default: 'Alice Doe' },
  },
  computed: {
    initials() {
      const parts = this.name.trim().split(/\s+/)
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
    },
  },
}
</script>

<style scoped>
.avatar {
  --brand-700: #A92E31;
  --overlay-border: rgba(0,0,0,0.06);
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: #F5C4C5; /* brand.100 */
  color: var(--brand-700);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid var(--overlay-border);
}
.initials { font-size: 12px; line-height: 1; }
</style>

