<template>
  <div class="rounded-[16px] border border-border bg-card shadow-md p-6">
    <div class="text-muted-foreground text-sm">{{ title }}</div>
    <div class="text-3xl font-bold my-1" :class="valueColorClass">{{ value }}</div>
    <div class="text-muted-foreground text-sm" v-if="meta">
      <span v-if="metaLabel">{{ metaLabel }}</span>
      <span class="ml-1" :class="trendColorClass" v-if="metaValue">{{ metaValue }}</span>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    // Use Tailwind theme tokens: 'primary' | 'accent' | ''
    color: { type: String, default: '' },
    metaLabel: { type: String, default: '' },
    metaValue: { type: String, default: '' },
    trend: { type: String, default: '' }, // 'up' | 'down'
  },
  computed: {
    valueColorClass() {
      if (this.color === 'primary') return 'text-primary'
      if (this.color === 'accent') return 'text-accent-foreground'
      return ''
    },
    trendColorClass() {
      if (this.trend === 'down') return 'text-primary'
      if (this.trend === 'up') return 'text-accent-foreground'
      return 'text-muted-foreground'
    },
    meta() {
      return this.metaLabel || this.metaValue
    }
  }
}
</script>

<style scoped>

</style>


