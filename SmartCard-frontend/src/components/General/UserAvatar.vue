<template>
  <button
    class="w-72 h-14 bg-white rounded-3xl shadow-[0px_2px_2px_0px_rgba(189,189,189,0.25)] border border-neutral-200 flex items-center gap-4 px-4 text-left cursor-pointer"
    aria-label="User menu"
    @click="emit('click')"
  >
    <img :src="avatarIcon" alt="User avatar" class="w-12 h-12 rounded-[250px] object-cover" />
    <div class="text-black text-sm font-light font-['Alibaba_PuHuiTi'] leading-tight">
      <div>{{ title }}</div>
      <div>{{ subtitle }}</div>
    </div>
  </button>
</template>

<script setup>
import avatarIcon from '../../../Resource/Staff/AvatarMan.svg'

const props = defineProps({
  title: { type: String, default: '店长-张三' },
  subtitle: { type: String, default: '朱友和大排档（天时科创园店）' },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
</style>