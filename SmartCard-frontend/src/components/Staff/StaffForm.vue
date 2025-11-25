<template>

  
  <div class="relative rounded-[38px] min-w-[1500px] h-[750px] border border-border bg-card shadow-md px-8 py-6 w-full ">
    
    <div class="absolute left-[40px] top-[38px] text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">员工管理</div>
   
       <!-- Headers -->
       <div class="mt-20 grid items-center form-grid" :style="gridStyle">
      <div
        v-for="(h, i) in renderHeaders":key="i" 
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
        {{ h }}
      </div>
       </div>


    <!-- Divider under headers -->
    <div class="mt-2 mb-7 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)]
     outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>



    <!-- Rows in a scrollable container -->
    <div class="mt-4 max-h-[420px] overflow-y-auto overflow-x-hidden">
      <div
        v-for="(row, rIdx) in staffRows"
        :key="row.id || rIdx"
        class="mb-4 grid items-center form-grid"
        :style="gridStyle"
      >
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
            @click="onRowDetailClick(row)"
            aria-label="查看服务报告"
          >
            <img :src="arrowIcon" alt="查看" class="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
    </div>
    



    <!-- Edit button: top-right corner -->
    <template v-if="!isEditing">

      <button
        type="button"
        class="absolute right-16 top-8 cursor-pointer"
        @click="onEditClick"
        aria-label="编辑员工信息"
      >
        <span class="relative block w-[42px] h-[42px]">
          <img :src="circleIcon" alt="edit-bg" class="w-[42px] h-[42px]" />
          <img :src="pencilIcon" alt="edit" class="w-[20px] h-[20px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>

      </button>

    </template>


    <template v-else>

      <div class="absolute right-10 top-8 flex items-center gap-2">
        <!-- Add button -->
        <button
          type="button"
          class="relative block w-[42px] h-[42px] cursor-pointer"
          @click="onAddClick"
          aria-label="新增员工信息"
        >
          <img :src="blackBgIcon" alt="add-bg" class="w-[42px] h-[42px]" />
          <img :src="whiteCrossIcon" alt="add" class="w-[24px] h-[24px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>

        <!-- Accomplish button -->
        <button
          type="button"
          class="relative block w-[78px] h-[42px] cursor-pointer"
          @click="onAccomplishClick"
          aria-label="完成编辑"
        >
          <img :src="blackBgIcon" alt="done-bg" class="w-[78px] h-[42px]" />
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base">完成</span>
        </button>
      </div>
    </template>



    <!-- Modal: Add Staff Info -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      <div class="relative flex flex-col items-center">

        <add-staff-info
          :postionTypeMap="postionTypeMap"
          @staff-added="onStaffAdded"
          @close="showAddModal = false"
        />
      </div>
    </div>



    <!-- Modal: Update Staff Info (edit mode detail) -->
    <div v-if="showUpdateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="relative flex flex-col items-center">

        <updata-staff-info :staff="selectedStaff" :postionTypeMap="postionTypeMap" @updated="onStaffUpdated" />
      
      </div>
    </div>


    <!-- Modal: Staff Report (view mode detail) -->
    <div v-if="showReportModal"
     class="fixed inset-0 z-50 flex items-center justify-center bg-black 
     bg-opacity-40 overflow-auto"
     @click.self="closeStaffReport">
      
      <div class="origin-center">
        <StaffReport :staff="reportStaff" 
        @close="closeStaffReport" />
      </div>
    </div>



    <!-- Pagination controls -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex items-center justify-center px-8">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-3 py-1 rounded-md border border-neutral-200 text-lg disabled:opacity-50"
          :disabled="!canGoPrev"
          @click="prevPage"
          aria-label="上一页"
        >
          上一页
        </button>

        <span class="text-neutral-700 text-lg">
          第 {{ currentPage }} / {{ totalPagesDisplay }} 页
        </span>

        <button
          type="button"
          class="px-3 py-1 rounded-md border border-neutral-200 text-lg disabled:opacity-50"
          :disabled="!canGoNext"
          @click="nextPage"
          aria-label="下一页"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
  
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'

import circleIcon from '../../../Resource/Staff/Circle.svg'
import pencilIcon from '../../../Resource/Staff/Pencil.svg'
import arrowIcon from '../../../Resource/Staff/arrow.svg'
import blackBgIcon from '../../../Resource/Staff/blackBG.svg'
import whiteCrossIcon from '../../../Resource/Staff/whiteCross.svg'

import AddStaffInfo from './addStaffInfo.vue'
import UpdataStaffInfo from './updataStaffInfo.vue'
import StaffReport from './staffReport.vue'

import { postForm, getRequest } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'



// Reactive state
const isEditing = ref(false)

const showAddModal = ref(false)
const showUpdateModal = ref(false)
const showReportModal = ref(false)

const staffRows = ref([])
const postionTypeMap = {
}

const selectedStaff = ref(null)

const reportStaff = ref(null)

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(null)

// Computed properties
const renderHeaders = computed(() => {
  
  const baseHeaders = ['姓名', '设备号', '岗位', '日均服务时间', '昨日差评事件', '评分', '服务报告']
  
  if (isEditing.value) {
    baseHeaders[6] = '信息详情'
  }

  return baseHeaders
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${renderHeaders.value.length}, minmax(50px, 1fr))`,
  columnGap: '24px',
}))

const totalPages = computed(() => {
  if (typeof totalItems.value === 'number' && totalItems.value > 0 && pageSize.value > 0) {
    return Math.max(1, Math.ceil(totalItems.value / pageSize.value))
  }
  return null
})

const totalPagesDisplay = computed(() => 
  totalPages.value != null ? totalPages.value : '—'
)


const canGoPrev = computed(() => currentPage.value > 1)

const canGoNext = computed(() => {
  if (totalPages.value != null) {
    return currentPage.value < totalPages.value
  }
  // Fallback when total unknown: allow next if current page seems full
  return Array.isArray(staffRows.value) && staffRows.value.length >= pageSize.value
})

// Methods
function formatTimeToHours(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) return '0小时'
  const hours = (seconds / 3600).toFixed(1)
  return `${hours}小时`
}

function onEditClick() {
  isEditing.value = !isEditing.value
 
}

function onAddClick() {
  showAddModal.value = true

}

function onAccomplishClick() {
  isEditing.value = false
}


function onRowDetailClick(row) {
  if (isEditing.value) {
    selectedStaff.value = {
      staff_id: row.staff_id || '',
      name: row.name || '',
      postion: row.postion || '',
      postion_type: row.postion_type || '',
      phone: row.phone || '',
      sex: row.sex || '',
    }
    showUpdateModal.value = true

  } else {

    reportStaff.value = row
    showReportModal.value = true
  }
}


async function getPostionType() {
  const res = await getRequest(PATHS.CONFIG_POSTION)

  if (res && res.status >= 200 && res.status < 300) {
    const data = res.data?.data
    if (data) {
      data.forEach(item => {
        postionTypeMap[item.postion] = item.type
      })
     
    }
  }
}

async function fetchStaffData(page = currentPage.value, size = pageSize.value) {
  
  await getPostionType()
  
  const payload = {
    page: String(page),
    limit: String(size),
  }
  
  try {
    const res = await postForm(PATHS.MANAGE_INDEX_STAFF, payload)
    if (res && res.status >= 200 && res.status < 300) {
      const data = res.data?.data
      
      if (data) {
        const staffList = data.staff_list || []
        
        // Map the API response to the format expected by staffRows
        staffRows.value = staffList.map(item => ({
          id: item._id,
          staff_id: item.staff_id._id,
          name: item.staff_id?.name || '—',
          sex: item.staff_id?.sex || '—',
          phone: item.staff_id?.phone || '—',
          device_number: item.device_id?.device_number || '—',
          postion: item.staff_id?.postion || '—',
          postion_type: item.staff_id?.postion_type || '—',
          day_time: item.day_work_time ?? 0,
          day_bad_count: item.day_bad_count ?? 0,
          score: item.staff_score ?? 0,
        }))
        
        // Update pagination info
        totalItems.value = data.total ?? 0
        currentPage.value = page
      
      }
    }
  } catch (error) {
    console.error('Failed to fetch staff data:', error)
  }
}

function closeStaffReport() {
  showReportModal.value = false
  reportStaff.value = null
}


function prevPage() {
  if (!canGoPrev.value) return
  const prev = Math.max(1, currentPage.value - 1)
  fetchStaffData(prev, pageSize.value)
}

function nextPage() {
  if (!canGoNext.value) return
  const next = currentPage.value + 1
  fetchStaffData(next, pageSize.value)
}

function onStaffUpdated() {
  // Ensure modal closed and refresh the list from API
  showUpdateModal.value = false
  fetchStaffData(currentPage.value, pageSize.value)
}

function onStaffAdded(payload) {
  // Close the add modal and refresh the list from API
  showAddModal.value = false
  fetchStaffData(currentPage.value, pageSize.value)
}

// Lifecycle
onMounted(() => {
  currentPage.value = 1
  fetchStaffData(currentPage.value, pageSize.value)
})
</script>


<style scoped>
.form-grid {
  margin-left: -72px;
  margin-right: -52px;
}
</style>


