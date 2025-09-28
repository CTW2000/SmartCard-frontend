<template>
  <button class="icon-btn" aria-label="Notifications" @click="$emit('click')">
    🔔
    <span v-if="count > 0" class="badge">{{ displayCount }}</span>
  </button>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    count: { type: Number, default: 3 },
  },
  computed: {
    displayCount() {
      return this.count > 9 ? '9+' : String(this.count)
    },
  },
}
</script>

<style scoped>
.icon-btn {
  position: relative;
  background: #F4F6F9; /* neutral.50 */
  border: 1px solid rgba(0,0,0,0.06); /* overlay.border */
  border-radius: 9999px;
  padding: 6px 8px;
  cursor: pointer;
}
.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #D94447; /* brand.600 */
  color: #FFFFFF; /* neutral.0 */
  border-radius: 9999px;
  font-size: 10px;
  line-height: 18px;
  width: 18px;
  height: 18px;
  text-align: center;
}
</style>

