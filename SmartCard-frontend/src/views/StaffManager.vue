<template>
  <section class="min-h-[calc(100vh-60px)] bg-background">
    <div class="w-full px-8 py-6">
      <h1 class="m-0 mb-4 text-[20px] font-bold tracking-[0.02em] text-foreground">员工管理</h1>

      <!-- Top summary cards (3-column responsive, gap ≈ 12px) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <StatCard title="本周店长评分" :value="managerScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(managerScoreRatio)" :trend="managerTrend" />
        <StatCard title="员工服务评分" :value="staffScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(staffScoreRatio)" :trend="staffTrend" />
        <StatCard title="员工差评原因TOP榜单" :items="badReasonItems" />
      </div>

      <!-- Form section -->
      <div class="w-full">
        <StaffForm @rowAction="onRowAction" />
      </div>
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
  },
  beforeDestroy() {}
}
</script>

<style scoped>
</style>
  
  
  