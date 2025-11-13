<template>
<div class="h-[606px] top-[113px] relative mx-[40px]">
    <div class="w-full h-[606px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
    
    
    <div class=" h-[350px] left-[40px] right-[40px] top-[214px] absolute bg-white rounded-[14px] border border-gray-200"></div>

    
    <div class="left-[35px] top-[30px] absolute justify-start text-stone-900 text-[22.5px] font-normal font-['Alibaba_PuHuiTi']">员工完成度榜单</div>
    <div class="left-[35px] top-[103px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">筛选</div>
    <div class="left-[53px] top-[182px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">员工</div>



    <div class="right-[440px] top-[182px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">完成率</div>
    <div class="w-[84px] h-[44px] right-[263px] top-[95px] absolute bg-white rounded-2xl border border-stone-300"></div>
    <div class="w-[84px] h-[44px] right-[85px] top-[95px] absolute bg-white rounded-2xl border border-stone-300"></div>

    <div class="right-[276px] top-[103px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">上一页</div>
    <div class="right-[100px] top-[103px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">下一页</div>
    <div class="w-[156px] h-[60px] left-[89px] top-[86px] absolute bg-white rounded-2xl border border-stone-300"></div>

    <div class="left-[113px] top-[103px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">全部</div>
    <div class="w-[84px] h-8 left-[269px] top-[100px] absolute bg-indigo-100 rounded-[15px]"></div>
    <div class="left-[287px] top-[105px] absolute justify-start text-neutral-600 text-[15px] font-normal font-['Alibaba_PuHuiTi']">总计4人</div>
    <div class="right-[194px] top-[105px] absolute justify-start text-neutral-600 text-[15px] font-normal font-['Alibaba_PuHuiTi']">第1/1页</div>
    <div class="h-0 left-[40px] right-[40px] top-[310px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
    <div class="h-0 left-[40px] right-[40px] top-[395px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>
    <div class="h-0 left-[40px] right-[40px] top-[479px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>

    
    <div class="w-12 h-12 left-[53px] top-[242px] absolute bg-slate-200 rounded-full"></div>
    <div class="left-[62px] top-[255px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">孙七</div>
    <div class="w-12 h-12 left-[53px] top-[326px] absolute bg-slate-200 rounded-full"></div>
    <div class="left-[62px] top-[340px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">张三</div>
    <div class="w-12 h-12 left-[53px] top-[411px] absolute bg-slate-200 rounded-full"></div>
    <div class="left-[62px] top-[425px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">李四</div>
    <div class="w-12 h-12 left-[53px] top-[496px] absolute bg-slate-200 rounded-full"></div>
    <div class="left-[62px] top-[509px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">赵六</div>

    
    <div class="left-[119px] top-[241px] absolute justify-start text-zinc-800 text-[22.5px] font-normal font-['Alibaba_PuHuiTi'] tracking-wider">1.孙七</div>
    <div class="left-[119px] top-[326px] absolute justify-start text-zinc-800 text-[22.5px] font-normal font-['Alibaba_PuHuiTi'] tracking-wider">2.张三</div>
    <div class="left-[119px] top-[410px] absolute justify-start text-zinc-800 text-[22.5px] font-normal font-['Alibaba_PuHuiTi'] tracking-wider">3.李四</div>
    <div class="left-[119px] top-[495px] absolute justify-start text-zinc-800 text-[22.5px] font-normal font-['Alibaba_PuHuiTi'] tracking-wider">4.赵六</div>
    <div class="left-[122px] top-[269px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">55/80桌</div>
    <div class="left-[122px] top-[354px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">40/60桌</div>
    <div class="left-[122px] top-[439px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">30/50桌</div>
    <div class="left-[122px] top-[524px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">30/50桌</div>
    
    <div class="right-[60px] top-[251px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">60%</div>
    <div class="w-72 h-6 right-[200px] top-[252px] absolute bg-slate-100 rounded-2xl"></div>
    <div class="w-48 h-6 right-[300px] top-[252px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl"></div>
    <div class="w-[84px] h-8 right-[100px] top-[248px] absolute bg-rose-100 rounded-[15px]"></div>
    <div class="right-[121px] top-[254px] absolute justify-start text-rose-700 text-[15px] font-normal font-['Alibaba_PuHuiTi']">未达标</div>

    <div class="right-[60px] top-[336px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">60%</div>
    <div class="w-72 h-6 right-[200px] top-[337px] absolute bg-slate-100 rounded-2xl"></div>
    <div class="w-48 h-6 right-[300px] top-[337px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl"></div>
    <div class="w-[84px] h-8 right-[100px] top-[333px] absolute bg-rose-100 rounded-[15px]"></div>
    <div class="right-[121px] top-[338px] absolute justify-start text-rose-700 text-[15px] font-normal font-['Alibaba_PuHuiTi']">未达标</div>

    <div class="right-[60px] top-[421px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">60%</div>
    <div class="w-72 h-6 right-[200px] top-[422px] absolute bg-slate-100 rounded-2xl"></div>
    <div class="w-48 h-6 right-[300px] top-[422px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl"></div>
    <div class="w-[84px] h-8 right-[100px] top-[418px] absolute bg-rose-100 rounded-[15px]"></div>
    <div class="right-[121px] top-[424px] absolute justify-start text-rose-700 text-[15px] font-normal font-['Alibaba_PuHuiTi']">未达标</div>

    <div class="right-[60px] top-[506px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">60%</div>
    <div class="w-72 h-6 right-[200px] top-[506px] absolute bg-slate-100 rounded-2xl"></div>
    <div class="w-48 h-6 right-[300px] top-[506px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl"></div>
    <div class="w-[84px] h-8 right-[100px] top-[503px] absolute bg-rose-100 rounded-[15px]"></div>
    <div class="right-[121px] top-[508px] absolute justify-start text-rose-700 text-[15px] font-normal font-['Alibaba_PuHuiTi']">未达标</div>
</div>
</template>


<script setup>
</script>

<style scoped>
</style>

