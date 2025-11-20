<template>
  <section class="min-h-[calc(100vh-60px)] bg-background">
    <div class="w-full px-8 py-6">
      <h1 class="m-0 mb-4 text-[20px] font-bold tracking-[0.02em] text-foreground">员工管理</h1>

      <!-- Top summary cards (3-column responsive, gap ≈ 12px) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <ScoreCard title="本周店长评分" :value="managerScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(managerScoreRatio)" :trend="managerTrend" />
        <ScoreCard title="员工服务评分" :value="staffScoreDisplay" metaLabel="同比上周增长" :metaValue="formatPercent(staffScoreRatio)" :trend="staffTrend" />
        <ScoreCard title="员工差评原因TOP榜单" :items="badReasonItems" />
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import ScoreCard from '../components/General/ScoreCard.vue'
import StaffForm from '../components/Staff/StaffForm.vue'
import StaffReport from '../components/Staff/staffReport.vue'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

// Reactive state
const managerScore = ref(0)
const managerScoreRatio = ref(0)
const staffScore = ref(0)
const staffScoreRatio = ref(0)
const badReasons = ref([])
const showReport = ref(false)
const selectedRow = ref(null)

// Computed properties
const managerTrend = computed(() => 
  managerScoreRatio.value >= 0 ? 'up' : 'down'
)

const staffTrend = computed(() => 
  staffScoreRatio.value >= 0 ? 'up' : 'down'
)

const managerScoreDisplay = computed(() => 
  `${managerScore.value} 分`
)

const staffScoreDisplay = computed(() => 
  `${staffScore.value} 分`
)

const badReasonItems = computed(() => 
  (badReasons.value || []).slice(0, 3).map((r, idx) => ({
    value: `TOP${idx + 1}`,
    metaValue: r?.resaon_name || ''
  }))
)

// Methods
function onRowAction(row) {
  selectedRow.value = row
  showReport.value = true
}

function closeReport() {
  showReport.value = false
  selectedRow.value = null
}

function formatPercent(value) {
  const num = Number(value) || 0
  if (Math.abs(num) <= 1) {
    return `${Math.round(num * 100)}%`
  }
  return `${num}%`
}

// Lifecycle
onMounted(() => {
  postForm(PATHS.STAFF_NAV)
    .then(({ data }) => {
      const json = data
      const result = json && json.data && Array.isArray(json.data.result) ? json.data.result[0] : null
      if (result) {
        managerScore.value = result.manager_score ?? 0
        managerScoreRatio.value = result.manager_score_ratio ?? 0
        staffScore.value = result.staff_score ?? 0
        staffScoreRatio.value = result.staff_score_ratio ?? 0
        badReasons.value = result.bad_rank || []
      }
    })
    .catch(() => {})
})
</script>

<style scoped>
</style>
  
  
  