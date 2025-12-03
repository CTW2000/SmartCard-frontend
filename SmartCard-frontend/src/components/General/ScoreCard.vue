<template>
  <div class="h-[150px] rounded-[16px] border border-border bg-card shadow-md p-6">
    <div class="text-neutral-500 text-xl font-normal font-['Alibaba_PuHuiTi']">{{ title }}</div>

    <div class="text-3xl font-bold mt-1" :class="valueColor">
      {{ props.value }}
    </div>


    <div class="text-stone-500 text-base mt-2" v-if="percentDisplay">
      <template v-if="percentDisplay.hasSplit">
        <span>{{ percentDisplay.prefix }}</span>
        <span :class="percentColor">{{ percentDisplay.value }}</span>
      </template>
      <template v-else>
        {{ percentDisplay.prefix }}
      </template>
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
  percentColor: { type: String, default: 'text-red-700' },
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

const percentDisplay = computed(() => {
  const text = percentText.value
  if (!text) return null

  const match = text.match(/^([^0-9]+)?([0-9]+%?)$/)
  if (!match) {
    return {
      hasSplit: false,
      prefix: text,
      value: '',
    }
  }

  return {
    hasSplit: true,
    prefix: match[1] ?? '',
    value: match[2] ?? '',
  }
})
</script>
