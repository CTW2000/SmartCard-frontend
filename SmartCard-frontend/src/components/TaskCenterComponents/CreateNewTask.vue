<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      @click="emit('close')"
    ></div>

      <div class="relative h-[444.75px] w-[605.25px]">
        <div class="absolute left-0 top-0 h-[389.25px] w-[605.25px] rounded-[31px] bg-white"></div>
        <div class="absolute left-[45px] top-[31.5px] justify-start text-[18px] font-medium text-neutral-800 font-['Alibaba_PuHuiTi']">新建任务</div>
        <div class="absolute left-[45px] top-[76.5px] h-[1.5px] w-[516px] rounded-[73px] bg-gray-200"></div>
        <div class="absolute left-[45px] top-[195px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">任务描述</div>
        <div class="absolute left-[45px] top-[110.25px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">任务类型</div>
        <div class="absolute left-[319.5px] top-[110.25px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">菜品名字</div>
        <div class="absolute left-[45.75px] top-[321.75px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">截止时间</div>
        <div class="absolute left-[143.25px] top-[179.25px] h-[108px] w-[417.75px] rounded-xl border border-zinc-300 shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)]"></div>
        <div class="absolute left-[252px] top-[321.75px] h-[36px] w-[108px] rounded-xl border border-neutral-300 bg-slate-50"></div>
        <div class="absolute left-[273.75px] top-[329.25px] justify-start text-[15px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi']">选择日期</div>
        <div class="absolute left-[163.5px] top-[197.25px] justify-start text-[15px] font-normal text-zinc-800 opacity-50 font-['Alibaba_PuHuiTi']">请输入您想要创建的任务内容</div>
        <div class="absolute left-[143.25px] top-[93.75px] h-[60px] w-[156px] rounded-2xl border border-stone-300 bg-white"></div>
        <div class="absolute left-[410.25px] top-[93.75px] h-[60px] w-[156px] rounded-2xl border border-stone-300 bg-white"></div>
        <div class="absolute left-[168px] top-[110.25px] justify-start text-[18px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi']">菜品推广</div>
        <div class="absolute left-[435px] top-[110.25px] justify-start text-[18px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi']">鱼子鱼泡</div>
 
    </div>
  </div>
</template>


<script setup>

const emit = defineEmits(['close'])


</script>

