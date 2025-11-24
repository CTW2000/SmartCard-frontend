<template>
  <div class="rounded-[16px] border border-border bg-card shadow-md p-6">
    <div class="text-stone-500 text-base font-bold">{{ title }}</div>

    <div class="text-3xl font-bold mt-1" :class="valueColor">
      {{ props.value }}
    </div>


    <div class="text-stone-500 text-base mt-2">
      {{ percentText || '' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], default: '' },
  valueColor: { type: String, default: 'text-stone-900' },
  percentValue: { type: [String, Number], default: '' },
})

const percentText = computed(() => {
  const raw = props.percentValue
  if (raw === '' || raw === null || raw === undefined) return ''
  const value = Number(raw)
  if (Number.isNaN(value)) return String(raw)
  if (value > 0) return `同比增长${value}%`
  if (value < 0) return `同比下降${Math.abs(value)}%`
  return '与上周持平'
})
</script>
