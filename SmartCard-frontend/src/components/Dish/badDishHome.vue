<template>
  <div class="relative">
    
    <div class="w-80 h-[471px] left-0 top-0 absolute rounded-[38px] border border-border bg-card shadow-md"></div>
    <div class="left-[56px] top-[35px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜品差评数</div>
   
    <div
      v-for="(item, index) in badRank.slice(0, 3)"
      :key="item._id || index"
    >
      <!-- Item name -->
      <div
        class="left-[56px] absolute justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate"
        :style="{ top: nameTop(index) + 'px', maxWidth: '250px' }"
      >
        {{ String(index + 1).padStart(2, '0') }}：{{ item.dish_name || '—' }}
      </div>
      
      <!-- Count -->
      <div
        class="left-[86px] absolute justify-start text-zinc-900 text-4xl font-medium font-['Alibaba_PuHuiTi'] truncate"
        :style="{ top: countTop(index) + 'px', maxWidth: '220px' }"
      >
        {{ item.bad_count || 0 }}（条）
      </div>
      
      <!-- Dot -->
      <div
        class="w-3.5 h-3.5 left-[56px] absolute rounded-full"
        :class="dotClass(index)"
        :style="{ top: dotTop(index) + 'px' }"
      ></div>
    </div>
    
    
    <div
      v-if="badRank.length === 0"
      class="absolute left-[96px] top-[230px] text-neutral-400 text-xl font-normal"
    >
      暂无差评菜品
    </div>
  </div>
</template>



<script setup>
defineProps({
  badRank: { type: Array, default: () => [] }
})

const nameTop = (index) => {
  const base = [122, 226, 334]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 108
}

const countTop = (index) => {
  const base = [165, 270, 378]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 108
}

const dotTop = (index) => {
  const base = [179, 286, 394]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 108
}

const dotClass = (index) => {
  if (index === 0) return 'bg-teal-300'
  if (index === 1) return 'bg-teal-300/70'
  if (index === 2) return 'bg-teal-300/40'
  return 'bg-teal-300/20'
}
</script>


