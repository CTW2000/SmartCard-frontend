<template>
 <section class="p-[25px]">

      <!-- Top summary cards (3-column responsive, gap ≈ 12px) -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <ScoreCard title="昨日店长评分" :value="fetchTaskData.manager_score + '分'" valueColor="text-red-500" :percentValue="fetchTaskData.manager_score_ratio" />
        <ScoreCard title="员工服务评分" :value="fetchTaskData.staff_score + '分'" valueColor="text-red-500" :percentValue="fetchTaskData.staff_score_ratio" />
        <StaffBadcountCard title="差评事件" :reasons="fetchTaskData.bad_reason_list" />
      </div>

      <!-- Form section -->
        <StaffForm @rowAction="onRowAction" />
    

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
import { ref, onMounted, reactive } from 'vue'

import ScoreCard from '../components/General/ScoreCard.vue'
import StaffForm from '../components/Staff/StaffForm.vue'
import StaffReport from '../components/Staff/staffReport.vue'
import StaffBadcountCard from '../components/Staff/StaffBadcountCard.vue'

import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'


const fetchTaskData = reactive({
  manager_score: 0,
  manager_score_ratio: 0,
  staff_score: 0,
  staff_score_ratio: 0,
  bad_reason_list: [],
})


const showReport = ref(false)
const selectedRow = ref(null)



// Methods
function onRowAction(row) {
  selectedRow.value = row
  showReport.value = true
}

function closeReport() {
  showReport.value = false
  selectedRow.value = null
}


async function fetchStaffManagerData() {
  try {
    const res = await postForm(PATHS.STAFF_NAV, { page: '', limit: '' })
    const payload = res?.data?.data?.result?.[0]
    if (payload) {
      fetchTaskData.manager_score = Number(payload.manager_score) || 0
      fetchTaskData.manager_score_ratio = Number(payload.manager_score_ratio) || 0
      fetchTaskData.staff_score = Number(payload.staff_score) || 0
      fetchTaskData.staff_score_ratio = Number(payload.staff_score_ratio) || 0
      fetchTaskData.bad_reason_list = Array.isArray(payload.bad_rank) ? payload.bad_rank : []
    }
  } catch (error) {
    console.error('[StaffManager] Failed to fetch staff nav data', error)
  }
}


// Lifecycle
onMounted(() => {
  fetchStaffManagerData()
})
</script>

<style scoped>
</style>
  
  
  