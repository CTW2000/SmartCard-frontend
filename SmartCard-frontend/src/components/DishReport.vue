<template>
  <div class="w-[1448px] h-[793px] relative overflow-hidden">
    <div class="w-[1448px] h-[793px] left-0 top-0 absolute bg-gray-50 rounded-[31px]"></div>
    <div class="w-[1317px] h-40 left-[65px] top-[114px] absolute">
      <div class="w-[1317px] h-40 left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
      <img class="w-20 h-20 left-[35px] top-[29px] absolute rounded-[276px] shadow-[0px_4px_4px_0px_rgba(194,194,194,0.25)] border-[3px] border-white" src="https://placehold.co/86x86" />
      <div class="left-[146px] top-[31px] absolute justify-start text-zinc-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">{{ dishName }}</div>
      <div class="w-40 h-9 left-[264px] top-[29px] absolute bg-gray-100 rounded-[57px]"></div>
      <div class="left-[284px] top-[37px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">今日总反馈52次</div>
      <div class="w-32 h-9 left-[435px] top-[29px] absolute bg-red-700 rounded-[57px]"></div>
      <div class="left-[455px] top-[37px] absolute justify-start text-white text-base font-normal font-['Alibaba_PuHuiTi']">负面占比32%</div>
      <div class="left-[182px] top-[86px] absolute justify-start text-amber-500 text-2xl font-medium font-['Alibaba_PuHuiTi']">4.3分</div>
      <div class="w-7 h-7 left-[144px] top-[86px] absolute overflow-hidden">
        <div class="w-7 h-7 left-[1.98px] top-[1.98px] absolute bg-amber-500"></div>
      </div>
      <div class="w-20 h-7 left-[264px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
      <div class="left-[284px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">蘑菇嫩</div>
      <div class="w-20 h-7 left-[355px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
      <div class="left-[375px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">鸡蛋滑</div>
      <div class="w-20 h-7 left-[518px] top-[88px] absolute bg-emerald-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
      <div class="left-[538px] top-[93px] absolute justify-start text-teal-800 text-sm font-medium font-['Alibaba_PuHuiTi']">份量足</div>
      <div class="w-16 h-7 left-[442px] top-[88px] absolute bg-rose-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
      <div class="left-[461px] top-[93px] absolute justify-start text-rose-800 text-sm font-medium font-['Alibaba_PuHuiTi']">略咸</div>
      <div class="w-20 h-7 left-[609px] top-[88px] absolute bg-rose-100 rounded-2xl shadow-[0px_4px_4px_0px_rgba(212,212,212,0.25)] border border-white"></div>
      <div class="left-[628px] top-[93px] absolute justify-start text-rose-800 text-sm font-medium font-['Alibaba_PuHuiTi']">价格高</div>
    </div>
    <div class="w-7 h-7 left-[93px] top-[81px] absolute origin-top-left -rotate-180 overflow-hidden">
      <div class="w-4 h-7 left-[5.73px] top-0 absolute bg-zinc-900"></div>
    </div>
    <div class="left-[116px] top-[45px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜品详情</div>
    <div class="w-96 h-28 left-[101px] top-[762px] absolute bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200"></div>
    <div class="left-[776px] top-[209px] absolute justify-start text-zinc-500 text-xs font-normal font-['Alibaba_PuHuiTi']">提示：绿色为正向，红色为负向。</div>
    <div class="w-5 h-5 left-[132px] top-[543px] absolute"></div>
    <div class="w-[844px] h-[474px] left-[538px] top-[288px] absolute">
      <div class="w-[844px] h-[474px] left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
      <div class="left-[43px] top-[28px] absolute justify-start text-zinc-800 text-2xl font-medium font-['Alibaba_PuHuiTi']">AI智能报告——{{ dishName }}</div>
      <div class="w-[765px] h-0 left-[43px] top-[78px] absolute shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>
      <div class="left-[45px] top-[97px] absolute justify-start"><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">一、核心反馈<br/>1. 好评点（27 条）<br/></span><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">家常味：15 位居民 / 家庭客群认可 “蛋嫩菇鲜”，符合定位。<br/>出餐快：8 位午市上班族反馈 “5 分钟上桌”，适配简餐需求。<br/>性价比高：4 位顾客认为 “28 元分量足”，优于同价小炒。<br/></span><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">2. 待改进（5 条）<br/></span><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">蘑菇出水：3 条反馈（含 2 桌夜宵党），因焯水后未挤干。<br/>咸淡不一：1 桌偏咸、1 桌偏淡，调味无统一标准。<br/>油感差异：1 位老年顾客反馈 “油稍多”。<br/></span><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">二、明日改进（责任人：李师傅）<br/></span><span class="text-black text-xl font-normal font-['Alibaba_PuHuiTi']">蘑菇焯水后需 “攥紧无水滴落”，完成帮厨培训。<br/>每份固定用盐 3g、生抽 5ml，定量取用。<br/>菜单备注 “可做少油版”，夜宵时段主动询问。</span></div>
    </div>
    <div class="w-96 h-[554px] left-[65px] top-[288px] absolute">
      <div class="w-96 h-[554px] left-0 top-0 absolute bg-white rounded-3xl border border-neutral-200"></div>
      <div class="w-96 h-28 left-[36px] top-[78px] absolute bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200"></div>
      <div class="left-[67px] top-[98px] absolute justify-start"><span class="text-red-700 text-base font-normal font-['Alibaba_PuHuiTi']">A02桌</span><span class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">    12:30 PM -- 12:37PM</span></div>
      <div class="left-[104px] top-[136px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">口味清淡，适合不喜欢太油的客人。</div>
      <div class="w-5 h-5 left-[67px] top-[136px] absolute overflow-hidden">
        <div class="w-5 h-5 left-0 top-0 absolute bg-emerald-400"></div>
      </div>
      <div class="w-96 h-28 left-[36px] top-[314px] absolute bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200"></div>
      <div class="left-[67px] top-[334px] absolute justify-start"><span class="text-red-700 text-base font-normal font-['Alibaba_PuHuiTi']">A08桌</span><span class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">    16:40 PM -- 16:47PM</span></div>
      <div class="left-[104px] top-[372px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">很喜欢这个组合，家常又下饭。</div>
      <div class="w-5 h-5 left-[67px] top-[372px] absolute overflow-hidden">
        <div class="w-5 h-5 left-0 top-0 absolute bg-emerald-400"></div>
      </div>
      <div class="w-96 h-28 left-[36px] top-[432px] absolute bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200"></div>
      <div class="left-[67px] top-[452px] absolute justify-start"><span class="text-red-700 text-base font-normal font-['Alibaba_PuHuiTi']">A12桌</span><span class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">    17:40 PM -- 17:47PM</span></div>
      <div class="left-[104px] top-[490px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">价格偏高，建议加点葱花提香</div>
      <div class="w-6 h-6 left-[65px] top-[491px] absolute overflow-hidden">
        <div class="w-5 h-5 left-[1.64px] top-[1.71px] absolute bg-red-700"></div>
        <div class="w-2.5 h-1 left-[6.65px] top-[14.81px] absolute bg-red-700"></div>
        <div class="w-[2.40px] h-[2.50px] left-[7.21px] top-[9.35px] absolute bg-red-700"></div>
        <div class="w-[2.40px] h-[2.50px] left-[14.40px] top-[9.35px] absolute bg-red-700"></div>
      </div>
      <div class="w-7 h-7 left-[35px] top-[26px] absolute overflow-hidden">
        <div class="w-6 h-6 left-[1.27px] top-[2.19px] absolute bg-gray-800"></div>
      </div>
      <div class="left-[78px] top-[27px] absolute justify-start text-zinc-800 text-xl font-medium font-['Alibaba_PuHuiTi']">当日顾客反馈（52次）</div>
      <div class="w-96 h-28 left-[36px] top-[196px] absolute bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(205,205,205,0.25)] border border-neutral-200"></div>
      <div class="left-[104px] top-[254px] absolute justify-start text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">鸡蛋有点老，蘑菇还不错，但整体偏咸。</div>
      <div class="left-[67px] top-[220px] absolute justify-start"><span class="text-red-700 text-base font-normal font-['Alibaba_PuHuiTi']">A05桌</span><span class="text-zinc-800 text-base font-normal font-['Alibaba_PuHuiTi']">    12:40 PM -- 12:47PM</span></div>
      <div class="w-6 h-6 left-[66px] top-[254px] absolute overflow-hidden">
        <div class="w-5 h-5 left-[1.64px] top-[1.71px] absolute bg-red-700"></div>
        <div class="w-2.5 h-1 left-[6.65px] top-[14.81px] absolute bg-red-700"></div>
        <div class="w-[2.40px] h-[2.50px] left-[7.21px] top-[9.35px] absolute bg-red-700"></div>
        <div class="w-[2.40px] h-[2.50px] left-[14.40px] top-[9.35px] absolute bg-red-700"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DishReport',
  props: {
    dishName: { type: String, default: '鸡蛋蘑菇' },
  },
}
</script>

<style scoped>
</style>
