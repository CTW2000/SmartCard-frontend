<template>
  <section class="min-h-[calc(100vh-64px)] bg-background">
    <div class="max-w-[1600px] mx-auto px-8 py-6">
      <div class="grid grid-cols-4 gap-6">
        <StatCard title="本周店长评分" :value="manager_score + '分'" color="primary" metaLabel="同比上周" :metaValue="manager_score_ratio" :trend="trendOf(manager_score_ratio)" />
        <StatCard title="员工服务评分" :value="staff_score + '分'" color="primary" metaLabel="同比上周" :metaValue="staff_score_ratio" :trend="trendOf(staff_score_ratio)" />
        <StatCard title="菜品差评分" :value="dish_bad_score + '分'" color="accent" metaLabel="与上周相比" :metaValue="dish_bad_ratio" :trend="trendOf(dish_bad_ratio)" />
        <StatCard title="昨日预警分数" :value="warn_score + '分'" color="accent" metaLabel="与上周相比" :metaValue="warn_ratio" :trend="trendOf(warn_ratio)" />
      </div>

      <div class="mt-6 overflow-x-auto">
        <div class="flex gap-6">
          <div class="flex-none w-[240px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <BadDish :items="badDishes" />
            </div>
          </div>
          <div class="flex-none w-[557.25px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <TaskPanel :tasks="tasks" />
            </div>
          </div>
          <div class="flex-none w-[650.25px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <LineChart />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <StaffForm @rowAction="onRowAction" />
      </div>
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
import LineChart from '../components/lineChart.vue'
import StaffFormHome from '../components/StaffFormHome.vue'
import BadDish from '../components/badDish.vue'
import TaskPanel from '../components/TaskPanel.vue'
import client, { postStoredCredentials }  from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
export default {
  name: 'Home',
  components: { StatCard, LineChart, StaffForm: StaffFormHome, BadDish, TaskPanel },
  data() {
    return {
      // demo until API loads
      badDishes: [
        { name: '红烧肉', score: 2.1 },
        { name: '宫保鸡丁', score: 2.0 },
        { name: '鱼香肉丝', score: 1.9 }
      ],
      // stats from /api/manage/index
      manager_score: '-',
      manager_score_ratio: '-',
      staff_score: '-',
      staff_score_ratio: '-',
      dish_bad_score: '-',
      dish_bad_ratio: '-',
      warn_ratio: '-',
      warn_score: '-',
      tasks: [],
    }
  },
  created() {
    this.loadManageIndex()
  },
  methods: {
    onRowAction(row) { console.log('Row action:', row) },
    trendOf(metaValue) {
      if (metaValue === null || metaValue === undefined) return ''
      const s = String(metaValue).trim()
      if (s.startsWith('-')) return 'down'
      if (s.startsWith('+')) return 'up'
      const n = Number(s.replace('%', ''))
      if (!Number.isNaN(n)) return n < 0 ? 'down' : n > 0 ? 'up' : ''
      return ''
    },
    formatRatio(val) {
      if (val === null || val === undefined || val === '-') return '-'
      const n = Number(val)
      if (Number.isNaN(n)) return String(val)
      const sign = n > 0 ? '+' : n < 0 ? '' : ''
      const abs = Math.abs(n)
      const numStr = Number.isInteger(abs) ? String(abs) : abs.toFixed(1)
      return `${sign}${numStr}%`
    },
    async loadManageIndex() {
      try {
        const res = await postStoredCredentials(PATHS.MANAGE_INDEX)
        const data = (res && res.data && (res.data.data || res.data.result)) ? (res.data.data || res.data.result) : (res && res.data) || {}
        // expected fields from API; fallback to previous values if missing
        const pick = (k, d = '-') => (data && data[k] !== undefined && data[k] !== null ? data[k] : d)
        this.manager_score = String(pick('manager_score', '-'))
        this.manager_score_ratio = this.formatRatio(pick('manager_score_ratio', '-'))
        this.staff_score = String(pick('staff_score', '-'))
        this.staff_score_ratio = this.formatRatio(pick('staff_score_ratio', '-'))
        this.dish_bad_score = String(pick('dish_bad_score', '-'))
        this.dish_bad_ratio = this.formatRatio(pick('dish_bad_ratio', '-'))
        this.warn_ratio = this.formatRatio(pick('warn_ratio', '-'))
        this.warn_score = String(pick('warn_score', '-'))
        // apply bad dish list to BadDish component
        const badList = Array.isArray(data.bad_dish_list) ? data.bad_dish_list : []
        this.badDishes = badList.map(d => ({
          name: (d && d.dish_name !== undefined && d.dish_name !== null) ? String(d.dish_name) : '-',
          amount: Number(d && d.sum !== undefined && d.sum !== null ? d.sum : 0) || 0,
        }))
        // tasks for TaskPanel
        this.tasks = Array.isArray(data.task_list) ? data.task_list : []
      } catch (e) {
        console.error('Failed to load manage index', e)
      }
    }
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


