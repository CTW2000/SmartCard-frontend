<template>
  
  <div class="relative rounded-[38px] h-[450px] min-w-[1500px] border border-border bg-card shadow-md px-8 py-6">

    <div class="absolute left-[50px] top-[38px] text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工管理</div>
   
    <!-- Headers -->

    <div class="mt-20 grid items-center form-grid" :style="gridStyle">
      <div
        v-for="(h, i) in renderHeaders"
        :key="i"
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
        {{ h }}
      </div>
    </div>


    <!-- Divider under headers -->
    <div class="mt-2 mb-7 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>


    <!-- Rows -->
    <div class="mt-4">

      <div v-for="(row, rIdx) in staffRows" :key="row.id || rIdx" class="mb-4 grid items-center form-grid" :style="gridStyle">
        <!-- Name -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ row.name }}
        </div>
        
        <!-- Device Number -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ row.device_number }}
        </div>
        
        <!-- Position -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ row.postion }}
        </div>
        
        <!-- Day Time -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ formatTimeToHours(row.day_time) }}
        </div>
        
        <!-- Day Bad Count -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ row.day_bad_count }}
        </div>
        
        <!-- Score -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          {{ row.score }}
        </div>
        
        <!-- Detail Button -->
        <div class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate text-center">
          <button
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-100"
            @click="openStaffReport(row)"
            aria-label="查看服务报告"
          >
            <img :src="arrowIcon" alt="查看" class="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Staff Report Modal -->
  <div
    v-if="showReport"
    class="fixed inset-0 z-50 flex items-center justify-center 
    bg-black bg-opacity-40 overflow-auto "
    @click.self="closeStaffReport"
  >
      <div class="origin-center">
        <StaffReport :staff="selectedStaff" @close="closeStaffReport" />
      </div>
 
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import arrowIcon from '../../../Resource/Staff/arrow.svg'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'
import StaffReport from './staffReport.vue'



// Reactive state
const staffLimit = ref(6)
const staffRows = ref([])
const showReport = ref(false)
const selectedStaff = ref(null)

// Computed properties
const renderHeaders = computed(() => 
  ['姓名', '设备号', '岗位', '日均服务时间', '昨日差评事件', '评分', '服务报告']
)


const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${renderHeaders.value.length}, minmax(50px, 1fr))`,
  columnGap: '24px',
}))

// Methods
function formatTimeToHours(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '0小时'
  const hours = (seconds / 3600).toFixed(1)
  return `${hours}小时`
}

async function fetchStaff() {
  try {
    const payload = {
      page: '1',
      limit: String(staffLimit.value),
    }

    const res = await postForm(PATHS.MANAGE_INDEX_STAFF, payload)
    if (res && res.status >= 200 && res.status < 300) {
      const data = res.data?.data
      
      if (data) {
        const staffList = data.staff_list || []
        
        const mapped = staffList.map(item => ({
          id: item._id,
          staff_id: item.staff_id?._id || '',
          name: item.staff_id?.name || '—',
          device_number: item.device_id?.device_number || '—',
          postion: item.staff_id?.postion || '—',
          day_time: item.day_work_time ?? 0,
          day_bad_count: item.day_bad_count ?? 0,
          score: item.staff_score ?? 0,
          detail: '服务报告'
        }))
        
        staffRows.value = mapped
      }
    }
  } catch (error) {
    console.error('Failed to fetch staff:', error)
  }
}

// Methods for staff report
function openStaffReport(staff) {
  selectedStaff.value = staff
  showReport.value = true
}

function closeStaffReport() {
  showReport.value = false
  selectedStaff.value = null
}

// Lifecycle
onMounted(() => {
  fetchStaff()
})
</script>

<style scoped>
.form-grid {
  margin-left: -72px;
  margin-right: -56px;
}
</style>


