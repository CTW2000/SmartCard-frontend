<template>
  <div v-if="open" class="relative inline-block">
    <div class="rounded-[16px] bg-card border border-border p-5 w-full max-w-[320px]" style="box-shadow: 0 8px 20px rgba(16,24,40,0.12)">
      <!-- Close button -->
      <button
        class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center"
        style="border-color: rgba(0,0,0,0.16)"
        aria-label="Close"
        @click="$emit('close')"
      >
        ✕
      </button>

      <!-- Avatar + Title -->
      <div class="flex flex-col items-center">
        <img :src="avatarUrl" alt="avatar" class="w-[96px] h-[96px] rounded-full object-cover ring-2" style="--tw-ring-color: rgba(0,0,0,0.08)" />
        <h3 class="mt-1 mb-2 text-[18px] font-bold tracking-[-0.01em] text-foreground text-center max-w-[260px]">{{ name }}</h3>
      </div>

      <!-- Divider -->
      <div class="h-px my-3" style="background: rgba(0,0,0,0.08)"></div>

      <!-- Info list (two-column, baseline) -->
      <div class="grid grid-cols-[96px_1fr] gap-y-2 items-baseline">
        <div class="text-[14px] font-semibold text-[rgba(15,23,42,0.65)]">岗位</div>
        <div class="text-[14px] font-medium text-foreground">{{ role }}</div>

        <div class="text-[14px] font-semibold text-[rgba(15,23,42,0.65)]">编号</div>
        <div class="text-[14px] font-medium text-foreground">{{ identifier }}</div>
      </div>
    </div>

    <!-- Floating action (edit) -->
    <button
      class="absolute left-1/2 -translate-x-1/2 -bottom-5 w-12 h-12 rounded-full bg-white flex items-center justify-center border"
      style="box-shadow: 0 6px 14px rgba(16,24,40,0.16); border-color: rgba(0,0,0,0.08)"
      aria-label="Edit"
      @click="$emit('edit')"
    >
      ✎
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, default: true },
  name: { type: String, default: 'Alice Doe' },
  role: { type: String, default: '前台' },
  identifier: { type: String, default: 'ID-01873' },
  email: { type: String, default: 'alice@example.com' },
  phone: { type: String, default: '138-0000-0000' },
  location: { type: String, default: '上海市 浦东新区' },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80&auto=format&fit=crop' },
})
</script>

<style scoped>
</style>


