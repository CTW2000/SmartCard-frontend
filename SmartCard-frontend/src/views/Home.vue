<template>
  <section class="min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <div class="grid grid-cols-4 gap-6">
        <StatCard title="本周店长评分" value="9.0分" color="primary" metaLabel="同比上周" metaValue="5%" trend="down" />
        <StatCard title="员工服务评分" value="9.2分" color="primary" metaLabel="同比上周" metaValue="1.7%" trend="down" />
        <StatCard title="菜品差评率" value="10%" color="accent" metaLabel="与上周持平" />
        <StatCard title="投流转化率" value="23%" color="accent" metaLabel="与上周相比下降" />
      </div>

      <div class="grid grid-cols-[1fr_1.4fr] gap-6 mt-6">
        <CircleGraph title="菜品关注度" />
        <LineChart />
      </div>

      <div class="mt-6">
        <FormCard :title="'员工服务评分'" :headers="headersStaff" :fields="fieldsStaff" :rows="rowsStaff" @rowAction="onRowAction" />
      </div>
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
import CircleGraph from '../components/CircleGraph.vue'
import LineChart from '../components/lineChart.vue'
import FormCard from '../components/Form.vue'
export default {
  name: 'Home',
  components: { StatCard, CircleGraph, LineChart, FormCard },
  data() {
    return {
      headersStaff: ['姓名', '设备号', '岗位', '日均服务时间', '每周差评事件', '评分', '详情'],
      fieldsStaff: ['name', 'no', 'role', 'hours', 'issues', 'score', 'detail'],
      rowsStaff: [
        { id: 1, name: '张伟', no: 'A001', role: '收银', hours: '6h', issues: 1, score: '4.5' },
        { id: 2, name: '王芳', no: 'A002', role: '服务', hours: '7h', issues: 0, score: '4.8' },
        { id: 3, name: '李强', no: 'A003', role: '后厨', hours: '8h', issues: 2, score: '4.2' },
        { id: 4, name: '刘洋', no: 'A004', role: '打荷', hours: '5h', issues: 0, score: '4.9' }
      ]
    }
  },
  methods: {
    onRowAction(row) { console.log('Row action:', row) }
  }
}
</script>

<style scoped>
.donut { width: 160px; height: 160px; }
.donut-bg { fill: none; stroke: #EEF1F5; stroke-width: 20; }
.donut-seg { fill: none; stroke: var(--color-primary); stroke-width: 20; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 60px 60px; }
.line-chart { width: 100%; height: 180px; }
.chart-rect { fill: var(--color-card); stroke: var(--color-border); }
.line-primary { stroke: var(--color-primary); }
.line-secondary { stroke: var(--color-secondary); }
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
</style>


