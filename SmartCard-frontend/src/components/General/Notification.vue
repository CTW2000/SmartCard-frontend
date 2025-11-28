<template>
  <button
    class="relative w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
    aria-label="Notifications"
    @click="emit('click')"
  >
    <span
      v-if="count > 0"
      class="absolute -top-1.5 -right-1.5 bg-[#D94447] text-white rounded-full text-[10px] leading-[18px] w-[18px] h-[18px] text-center"
    >
      {{ displayCount }}
    </span>
    <img :src="notificationIcon" alt="Notifications" class="w-6 h-6" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import notificationIcon from '../../../Resource/Home/Notification.svg'

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