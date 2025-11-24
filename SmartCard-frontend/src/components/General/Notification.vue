<template>
  <button
    class="relative bg-[#F4F6F9] border border-black/5 rounded-full px-2 py-1 cursor-pointer"
    aria-label="Notifications"
    @click="emit('click')"
  >
    🔔
    <span
      v-if="count > 0"
      class="absolute -top-1.5 -right-1.5 bg-[#D94447] text-white rounded-full text-[10px] leading-[18px] w-[18px] h-[18px] text-center"
    >{{ displayCount }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, default: 3 },
})

const emit = defineEmits(['click'])

const displayCount = computed(() => {
  return props.count > 9 ? '9+' : String(props.count)
})
</script>

<style scoped>
</style>

