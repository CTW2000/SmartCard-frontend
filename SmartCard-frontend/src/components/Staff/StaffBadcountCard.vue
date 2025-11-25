<template>
    <div class="rounded-[16px] border border-border bg-card shadow-md p-6">
      <div class="text-stone-500 text-base font-bold">{{ title }}</div>

      <div class="flex gap-15 mt-1 text-center">
        <div class="flex flex-col items-center">
          <div class="text-[#1a5f1a] text-3xl font-bold font-['Alibaba_PuHuiTi']">TOP1</div>
          <div class="text-stone-500 text-base  truncate max-w-[8rem] mt-2">
            {{ reasons[0]?.resaon_name ?? '-' }}
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-[#1a5f1a] text-3xl font-bold font-['Alibaba_PuHuiTi']">TOP2</div>
          <div class="text-stone-500 text-base truncate max-w-[8rem] mt-2">
            {{ reasons[1]?.resaon_name ?? '-' }}
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-[#1a5f1a] text-3xl font-bold font-['Alibaba_PuHuiTi']">TOP3</div>
          <div class="text-stone-500 text-base truncate max-w-[8rem] mt-2">
            {{ reasons[2]?.resaon_name ?? '-' }}
          </div>
        </div>
      </div>
      

    
    </div>
  


        
  </template>
  
  <script setup>
  
  const props = defineProps({
    title: { type: String, required: true },
    reasons: { type: Array, default: () => [] },
  })
  </script>