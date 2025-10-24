<template>
  <section class="min-h-[calc(100vh-60px)] bg-background">
    <div class="max-w-[1200px] mx-auto px-8 py-6">
      <h1 class="m-0 mb-4 text-[20px] font-bold tracking-[0.02em] text-foreground">员工管理</h1>

      <!-- Top summary cards (3-column responsive, gap ≈ 12px) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <StatCard title="本周店长评分" :value="managerScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(managerScoreRatio)" :trend="managerTrend" />
        <StatCard title="员工服务评分" :value="staffScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(staffScoreRatio)" :trend="staffTrend" />
        <StatCard title="员工差评原因TOP榜单" :items="badReasonItems" />
      </div>

      <!-- Form section -->
      <StaffForm :title="'员工服务评分'" :headers="headersStaff" :fields="fieldsStaff" :rows="rowsStaff" @rowAction="onRowAction" />
    </div>

    <!-- StaffReport modal overlay -->
    <div v-if="showReport" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="relative">
        <staff-report />
        <button type="button" class="absolute -top-4 -right-4 bg-white rounded-full px-3 py-1 border border-neutral-200 shadow" @click="closeReport">关闭</button>
      </div>
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
import StaffForm from '../components/StaffForm.vue'
import StaffReport from '../components/staffReport.vue'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

export default {
  name: 'StaffManagement',
  components: { StatCard, StaffForm, StaffReport },
  data() {
    return {
      managerScore: 0,
      managerScoreRatio: 0,
      staffScore: 0,
      staffScoreRatio: 0,
      badReasons: [],
      headersStaff: ['姓名', '设备号', '岗位', '日均服务时间', '每周差评事件', '评分', '详情'],
      fieldsStaff: ['name', 'no', 'role', 'hours', 'issues', 'score', 'detail'],
      rowsStaff: [
        { id: 1, name: '张伟', no: 'A001', role: '收银', hours: '6h', issues: 1, score: '4.5' },
        { id: 2, name: '王芳', no: 'A002', role: '服务', hours: '7h', issues: 0, score: '4.8' },
        { id: 3, name: '李强', no: 'A003', role: '后厨', hours: '8h', issues: 2, score: '4.2' },
        { id: 4, name: '刘洋', no: 'A004', role: '打荷', hours: '5h', issues: 0, score: '4.9' }
      ],
      showReport: false,
      selectedRow: null
    }
  },
  computed: {
    managerTrend() {
      return this.managerScoreRatio >= 0 ? 'up' : 'down'
    },
    staffTrend() {
      return this.staffScoreRatio >= 0 ? 'up' : 'down'
    },
    managerScoreDisplay() {
      return `${this.managerScore} 分`
    },
    staffScoreDisplay() {
      return `${this.staffScore} 分`
    },
    badReasonItems() {
      return (this.badReasons || []).slice(0, 3).map((r, idx) => ({
        value: `TOP${idx + 1}`,
        metaValue: r?.resaon_name || ''
      }))
    }
  },
  methods: {
    onRowAction(row) {
      this.selectedRow = row
      this.showReport = true
    },
    closeReport() {
      this.showReport = false
      this.selectedRow = null
    },
    formatPercent(value) {
      const num = Number(value) || 0
      if (Math.abs(num) <= 1) {
        return `${Math.round(num * 100)}%`
      }
      return `${num}%`
    }
  },
  mounted() {
    postForm(PATHS.STAFF_NAV)
      .then(({ data }) => {
        const json = data
        const result = json && json.data && Array.isArray(json.data.result) ? json.data.result[0] : null
        if (result) {
          this.managerScore = result.manager_score ?? 0
          this.managerScoreRatio = result.manager_score_ratio ?? 0
          this.staffScore = result.staff_score ?? 0
          this.staffScoreRatio = result.staff_score_ratio ?? 0
          this.badReasons = result.bad_rank || []
        }
      })
      .catch(() => {})
  }
}
</script>

<style scoped>
</style>
  
  
  