<template>
<div class="h-[606px] top-[113px] relative mx-[40px]">
    <div class="w-full h-[606px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
    
    
    <div class=" h-[350px] left-[40px] right-[40px] top-[214px] absolute bg-white rounded-[14px] border border-gray-200"></div>

    
    <div class="left-[35px] top-[30px] absolute justify-start text-stone-900 text-[22.5px] font-normal font-['Alibaba_PuHuiTi']">员工完成度榜单</div>
    <div class="left-[35px] top-[103px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">筛选</div>
    <div class="left-[53px] top-[182px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">员工</div>

    <div class="right-[440px] top-[182px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">完成率</div>
    
    <!-- Pagination buttons -->
    <button
      type="button"
      class="w-[84px] h-[44px] right-[263px] top-[95px] absolute bg-white rounded-2xl border border-stone-300 text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi'] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :disabled="staffPage <= 1"
      @click="prevStaffPage"
    >
      上一页
    </button>
    <button
      type="button"
      class="w-[84px] h-[44px] right-[85px] top-[95px] absolute bg-white rounded-2xl border border-stone-300 text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi'] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :disabled="staffTotal != null && staffPage >= Math.ceil(staffTotal / staffPageSize)"
      @click="nextStaffPage"
    >
      下一页
    </button>
    <div class="w-[156px] h-[60px] left-[89px] top-[86px] absolute bg-white rounded-2xl border border-stone-300"></div>

    <div class="left-[113px] top-[103px] absolute justify-start text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi']">全部</div>
    <div class="w-[84px] h-8 left-[269px] top-[100px] absolute bg-indigo-100 rounded-[15px]"></div>
    <div class="left-[287px] top-[105px] absolute justify-start text-neutral-600 text-[15px] font-normal font-['Alibaba_PuHuiTi']">
      总计{{ staffTotal != null ? staffTotal : 0 }}人
    </div>
    <div class="right-[194px] top-[105px] absolute justify-start text-neutral-600 text-[15px] font-normal font-['Alibaba_PuHuiTi']">
      第{{ staffPage }}/{{ staffTotal != null && staffPageSize > 0 ? Math.max(1, Math.ceil(staffTotal / staffPageSize)) : 1 }}页
    </div>
    
    <!-- Dynamic separator lines -->
    <template v-for="(item, index) in staffList" :key="'separator-' + index">
      <div 
        v-if="index > 0"
        class="h-0 left-[40px] right-[40px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-200"
        :style="{ top: (310 + (index - 1) * 85) + 'px' }"
      ></div>
    </template>

    <!-- Dynamic staff list -->
    <template v-for="(item, index) in staffList" :key="'staff-' + (item._id || index)">
      <!-- Avatar + name -->
      <div 
        class="absolute left-[53px] flex items-center gap-4"
        :style="{ top: (214 + 24 + 85 * index) + 'px' }"
      >
        <div class="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
          <img 
            :src="AvatarMan"
            :alt="item.staff_id?.name || 'staff avatar'"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <div 
          class="text-zinc-800 text-[22.5px] font-normal font-['Alibaba_PuHuiTi'] tracking-wider"
        >
          {{ (staffPage - 1) * staffPageSize + index + 1 }}.{{ item.staff_id?.name || '未知' }}
        </div>
      </div>




      
      <!-- Progress percentage -->
      <div 
        class="right-[60px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']"
        :style="{ top: (214 + 37 + 85 * index) + 'px' }"
      >
        {{ item.progress || 0 }}%
      </div>

      <!-- Progress bar background -->
      <div 
        class="w-72 h-6 right-[200px] absolute bg-slate-100 rounded-2xl"
        :style="{ top: (214 + 38 + 85 * index) + 'px' }"
      ></div>

      <!-- Progress bar fill -->
      <div 
        class="h-6 right-[300px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl"
        :style="{ 
          top: (214 + 38 + 85 * index) + 'px',
          width: Math.min(100, Math.max(0, item.progress || 0)) * 2.88 + 'px'
        }"
      ></div>

      <!-- Status badge -->
      <div 
        class="w-[84px] h-8 right-[100px] absolute rounded-[15px]"
        :class="getStatusInfo(item.status).badgeClass"
        :style="{ top: (214 + 34 + 85 * index) + 'px' }"
      ></div>
      <div 
        class="right-[121px] absolute justify-start text-[15px] font-normal font-['Alibaba_PuHuiTi']"
        :class="getStatusInfo(item.status).textClass"
        :style="{ top: (214 + 40 + 85 * index) + 'px' }"
      >
        {{ getStatusInfo(item.status).text }}
      </div>
    </template>
</div>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'
import AvatarMan from '../../../Resource/Staff/AvatarMan.svg'

const props = defineProps({
  task_id: { type: String, default: '' }
})

const staffPage = ref(1)
const staffPageSize = ref(6)
const staffTotal = ref(null)

const staffList = ref([])


async function fetchTaskList(page = staffPage.value, size = staffPageSize.value) {
  try {
    const payload = {
      page: String(page),
      size: String(size),
      task_id: props.task_id,
      gruop_id: ''
    }
    const res = await postForm(PATHS.TASK_INFO, payload)

    if (res && res.status >= 200 && res.status < 300) {
      const responseData = res.data || {}
      const data = responseData.data || {}
      const infoList = Array.isArray(data.task_info_list) ? data.task_info_list : []

      // Store the full task info objects
      staffList.value = infoList.map(item => ({
        _id: item?._id || null,
        staff_id: item?.staff_id || null,
        progress: typeof item?.progress === 'number' ? item.progress : 0,
        status: typeof item?.status === 'number' ? item.status : 0
      }))

      const total = typeof data.total === 'number' ? data.total : null
      staffTotal.value = total
      staffPage.value = page != null ? page : staffPage.value
    }
  } catch (error) {
    console.error('[StaffTaskComplete] Failed to fetch task info:', error)
  }
}

function getStatusInfo(status) {
  // Status: 0 = 未达标 (not meeting standard), 1 = 达标 (meeting standard), etc.
  if (status === 0) {
    return {
      text: '未达标',
      badgeClass: 'bg-rose-100',
      textClass: 'text-rose-700'
    }
  }
  if (status === 1) {
    return {
      text: '达标',
      badgeClass: 'bg-green-100',
      textClass: 'text-green-700'
    }
  }
  return {
    text: '未达标',
    badgeClass: 'bg-rose-100',
    textClass: 'text-rose-700'
  }
}


function prevStaffPage() {
  if (staffPage.value <= 1) return
  const prev = Math.max(1, staffPage.value - 1)
  fetchTaskList(prev, staffPageSize.value)
}

function nextStaffPage() {
  const totalPages = staffTotal.value != null && staffPageSize.value > 0 ? Math.max(1, Math.ceil(staffTotal.value / staffPageSize.value)) : null
  if (totalPages != null && staffPage.value >= totalPages) return
  const next = staffPage.value + 1
  fetchTaskList(next, staffPageSize.value)
}

onMounted(async () => {
  await fetchTaskList(staffPage.value, staffPageSize.value)
})

</script>

<style scoped>
</style>


