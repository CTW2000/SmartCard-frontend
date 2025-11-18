<template>
  <div class="rounded-[16px] border border-border bg-card shadow-md p-6">
    <div class="text-muted-foreground text-sm">{{ title }}</div>
    <!-- Multiple metrics horizontally when items provided -->
    <div v-if="hasItems" class="grid grid-flow-col auto-cols-fr gap-6 mt-2">
      <div v-for="(it, idx) in items" :key="idx" class="flex flex-col min-w-[80px]">
        <div v-if="it.value" class="text-3xl font-bold my-1" :class="valueColorClassFor(it)">{{ it.value }}</div>
        <div class="text-muted-foreground text-sm" v-if="it.metaLabel || it.metaValue">
          <span v-if="it.metaLabel">{{ it.metaLabel }}</span>
          <span class="ml-1" :class="trendColorClassFor(it)" v-if="it.metaValue">{{ it.metaValue }}</span>
        </div>
      </div>
    </div>
    <!-- Fallback to single metric API -->
    <template v-else>
      <div class="text-3xl font-bold my-1" :class="valueColorClass">{{ value }}</div>
      <div class="text-muted-foreground text-sm" v-if="meta">
        <span v-if="metaLabel">{{ metaLabel }}</span>
        <span class="ml-1" :class="trendColorClass" v-if="metaValue">{{ metaValue }}</span>
      </div>
    </template>
  </div>
  </template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  // Use Tailwind theme tokens: 'primary' | 'accent' | ''
  color: { type: String, default: '' },
  metaLabel: { type: String, default: '' },
  metaValue: { type: String, default: '' },
  trend: { type: String, default: '' }, // 'up' | 'down'
  // New: multiple metrics support
  items: {
    type: Array,
    default: () => [] // [{ value, metaLabel?, metaValue?, trend?, color? }]
  }
})

const valueColorClass = computed(() => {
  if (props.color === 'primary') return 'text-primary'
  if (props.color === 'accent') return 'text-accent-foreground'
  return ''
})

const trendColorClass = computed(() => {
  if (props.trend === 'down') return 'text-primary'
  if (props.trend === 'up') return 'text-accent-foreground'
  return 'text-muted-foreground'
})

const meta = computed(() => {
  return props.metaLabel || props.metaValue
})

const hasItems = computed(() => {
  return Array.isArray(props.items) && props.items.length > 0
})

const valueColorClassFor = (it) => {
  const c = it && it.color ? it.color : props.color
  if (c === 'primary') return 'text-primary'
  if (c === 'accent') return 'text-accent-foreground'
  return ''
}

const trendColorClassFor = (it) => {
  const t = it && it.trend ? it.trend : props.trend
  if (t === 'down') return 'text-primary'
  if (t === 'up') return 'text-accent-foreground'
  return 'text-muted-foreground'
}
</script>


