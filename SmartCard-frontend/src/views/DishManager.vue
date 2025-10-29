<template>
  <section class="page">
 
    <div class="charts-row">
      <div class="chart">
        <div class="origin-top-left" style="zoom: 0.75;">
          <LineChart />
        </div>
      </div>
      <div class="chart">
        <div class="origin-top-left" style="zoom: 0.75;">
          <BadDishMenu />
        </div>
        <div class="time-switch">
          <div class="w-11 h-44 relative">
            <div class="w-11 h-11 left-0 top-0 absolute bg-white rounded-full border border-gray-200"></div>
            <div class="w-11 h-11 left-0 top-[65px] absolute bg-white rounded-full border border-gray-200"></div>
            <div class="w-11 h-11 left-0 top-[130px] absolute bg-white rounded-full border border-gray-200"></div>
            <div class="left-[11px] top-[6px] absolute opacity-50 justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">日</div>
            <div class="left-[11px] top-[71px] absolute justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">周</div>
            <div class="left-[11px] top-[136px] absolute opacity-50 justify-start text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">月</div>
          </div>
          <div class="w-40 h-36 relative mt-2 cursor-pointer" @click="goToMenuDetail">
            <div class="w-40 h-36 left-0 top-0 absolute bg-white rounded-3xl border border-gray-200"></div>
            <div class="left-[40px] top-[94px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi']">菜单详情</div>
            <div class="w-11 h-11 left-[57px] top-[30px] absolute bg-white rounded-full border border-gray-200"></div>
            <div class="w-6 h-6 left-[67px] top-[40px] absolute overflow-hidden">
              <img :src="ThreeGang" alt="menu" class="w-6 h-6 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="forms-row">
      <div class="form-card">
        <DishRank
          :title="'菜品销量热榜'"
          :items="hotItems"
          :valueFormatter="v => `${v}`"
          @open-report="onOpenReport"
        />
      </div>
      <div class="form-card">
        <DishRank
          :title="'菜品销量冷榜'"
          :items="coldItems"
          :valueFormatter="v => `${v}`"
          type="new"
          @open-report="onOpenReport"
        />
      </div>
    </div>
    <div v-if="reportVisible" class="report-overlay" @click.self="closeReport">
      <div class="report-content">
        <DishReport :dishName="reportDishName" />
      </div>
    </div>
  </section>
</template>

<script>
import LineChart from '../components/lineChart.vue'
import BadDishMenu from '../components/badDishMenu.vue'
import DishRank from '../components/DishRank.vue'
import ThreeGang from '../../Resource/Menu/ThreeGang.svg'
import DishReport from '../components/DishReport.vue'

export default {
  name: 'DishManager',
  components: { LineChart, BadDishMenu, DishRank, DishReport },
  data() {
    return {
      ThreeGang,
      reportVisible: false,
      reportDishName: '-',
      rowsHot: [
        { id: 1, rank: 1, name: '友和秘制鸡爪', sales: '999+' },
        { id: 2, rank: 2, name: '招牌擀面皮炒鸡', sales: 876 },
        { id: 3, rank: 3, name: '红油凉粉', sales: 543 },
        { id: 4, rank: 4, name: '铁盆酸菜鱼', sales: 541 },
        { id: 5, rank: 5, name: '香辣大扒皮鱼', sales: 324 },
        { id: 6, rank: 6, name: '友和王牌麻辣龙虾', sales: 123 }
      ],
      rowsCold: [
        { id: 1, rank: 1, name: '友和秘制鸡爪', sales: 0 },
        { id: 2, rank: 2, name: '招牌擀面皮炒鸡', sales: 0 },
        { id: 3, rank: 3, name: '红油凉粉', sales: 3 },
        { id: 4, rank: 4, name: '铁盆酸菜鱼', sales: 15 },
        { id: 5, rank: 5, name: '香辣大扒皮鱼', sales: 16 },
        { id: 6, rank: 6, name: '友和王牌麻辣龙虾', sales: 19 }
      ]
    }
  }
  ,
  computed: {
    hotItems() {
      return this.rowsHot.map(r => ({ id: r.id, name: r.name, value: r.sales }))
    },
    coldItems() {
      return this.rowsCold.map(r => ({ id: r.id, name: r.name, value: r.sales }))
    }
  }
  ,
  methods: {
    onOpenReport(name) {
      this.reportDishName = name || '-'
      this.reportVisible = true
    },
    closeReport() {
      this.reportVisible = false
    },
    goToMenuDetail() {
      this.$router.push({ name: 'MenuDetail' })
    }
  }
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.charts-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}
.chart {
  flex: 1;
  position: relative;
}
.forms-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.form-card {
  flex: 1 1 380px;
  min-width: 320px;
}
.time-switch {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.report-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.report-content {
  background: transparent;
  border-radius: 0.5rem;
  overflow: hidden;
  /* scale down to better fit typical screens */
  zoom: 0.85;
}
</style>