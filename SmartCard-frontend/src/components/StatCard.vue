<template>
  <div class="card stat">
    <div class="caption">{{ title }}</div>
    <div class="value" :class="colorClass">{{ value }}</div>
    <div class="meta" v-if="meta">
      <span class="label" v-if="metaLabel">{{ metaLabel }}</span>
      <span :class="trendClass" v-if="metaValue">{{ metaValue }}</span>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    color: { type: String, default: '' }, // '', 'brand', 'success'
    metaLabel: { type: String, default: '' },
    metaValue: { type: String, default: '' },
    trend: { type: String, default: '' }, // 'up' | 'down'
  },
  computed: {
    colorClass() {
      return this.color ? this.color : ''
    },
    trendClass() {
      if (this.trend === 'down') return 'down'
      if (this.trend === 'up') return 'up'
      return ''
    },
    meta() {
      return this.metaLabel || this.metaValue
    }
  }
}
</script>

<style scoped>
/* keep styles minimal; main card styles live in page */
.stat .value.up { color: var(--success); }
.stat .value.brand { color: var(--brand); }
.meta .down { color: var(--brand); margin-left: 6px; }
.meta .up { color: var(--success); margin-left: 6px; }
</style>


