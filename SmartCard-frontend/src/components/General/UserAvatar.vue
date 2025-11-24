<template>
  <button
    class="w-8 h-8 rounded-full bg-[#F5C4C5] text-[#A92E31] inline-flex items-center justify-center font-bold border border-black/5"
    aria-label="User menu"
    @click="emit('click')"
  >
    <span class="text-[12px] leading-none">{{ initials }}</span>
  </button>
  </template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: 'Alice Doe' },
})

const emit = defineEmits(['click'])

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})
</script>

<style scoped>
</style>

