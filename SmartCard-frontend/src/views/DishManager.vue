<template>
  <section class="page">
    <div class="scaled">
    <div class="flex items-start gap-[20px]">
      <div class="origin-top-left">
        <LineChart />
      </div>
      <div class="origin-top-left">
        <BadDishMenu />
      </div>
      <div class="flex flex-col justify-between items-center h-[471px]">
        <div class="w-[66px] h-[261px] relative">
          <div class="w-[66px] h-[66px] left-0 top-0 absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="opacity-50 text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">日</span>
          </div>
          <div class="w-[66px] h-[66px] left-0 top-[97.5px] absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">周</span>
          </div>
          <div class="w-[66px] h-[66px] left-0 top-[195px] absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="opacity-50 text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">月</span>
          </div>
        </div>
        <div class="w-40 h-36 relative mt-2">
          <div class="w-40 h-36 left-0 top-0 absolute bg-white rounded-3xl border border-gray-200"></div>
          <div class="left-[40px] top-[94px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi']">菜单详情</div>
          <div class="w-11 h-11 left-[57px] top-[30px] absolute bg-white rounded-full border border-gray-200"></div>
          <div class="w-6 h-6 left-[67px] top-[40px] absolute overflow-hidden">
              <div class="w-6 h-5 left-[1.64px] top-[3.25px] absolute bg-neutral-600"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 w-full flex items-start gap-[20px]">
      <div class="flex-1 min-w-0">
        <DishRank />
      </div>
      <div class="flex-1 min-w-0">
        <DishRank type="new" />
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import LineChart from '../components/lineChartMenu.vue'
import BadDishMenu from '../components/badDishMenu.vue'
import DishRank from '../components/DishRank.vue'
export default {
  name: 'DishManager',
  components: {
    LineChart,
    BadDishMenu,
    DishRank
  }
}
</script>

<style scoped>
.page {
  padding: 16px;
}
.scaled {
  transform: scale(1);
  transform-origin: top left;
}
</style>