<template>
<div class="relative inline-block">
  <div class="w-[473px] h-[240px] relative">
    <div class="w-[473px] h-[240px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
    <div class="left-[48px] top-[27px] absolute justify-start text-stone-900 text-[22px] font-normal font-['Alibaba_PuHuiTi']">{{ taskName }}</div>
    <div class="w-[84px] h-[30px] left-[365px] top-[26px] absolute rounded-[15px]" :class="taskStatus.badgeClass"></div>
    <div class="left-[381px] top-[28px] absolute justify-start text-[18px] font-medium font-['Alibaba_PuHuiTi']" :class="taskStatus.textClass">{{ taskStatus.text }}</div>
    <div class="left-[48px] top-[65px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">{{ belongText }} · 截止 {{ formattedEndTime }}</div>
    <div class="left-[48px] top-[137px] absolute justify-start text-stone-500 text-[18px] font-normal font-['Alibaba_PuHuiTi']">昨日完成情况 {{ task_progress || '0' }}%</div>
    <div class="w-[398px] h-[24px] left-[47px] top-[107px] absolute bg-slate-100 rounded-[12px]"></div>
    <div class="h-[24px] left-[47px] top-[107px] absolute bg-slate-900 rounded-tl-[12px] rounded-bl-[12px]" :style="{ width: progressWidth }"></div>
    <button
      type="button"
      class="w-[108px] h-[48px] left-[228px] top-[176px] absolute bg-slate-100 rounded-[9px] shadow-[0px_4px_4px_0px_rgba(168,168,168,0.25)] flex items-center justify-center text-zinc-800 text-[18px] font-normal font-['Alibaba_PuHuiTi'] hover:bg-slate-200 transition-colors"
      @click="goToTaskDetail"
    >
      查看详情
    </button>
    <div class="w-[108px] h-[48px] left-[341px] top-[176px] absolute bg-slate-900 rounded-[9px] shadow-[0px_4px_4px_0px_rgba(168,168,168,0.25)]"></div>
    <div class="left-[356px] top-[187px] absolute justify-start text-white text-[18px] font-normal font-['Alibaba_PuHuiTi']">任务作废</div>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  task_id: { type: String, default: '' },
  task_type: { type: String, default: '' },
  task_belong: { type: String, default: '' },
  task_status: { type: String, default: '' },
  task_endtime: { type: String, default: '' },
  task_progress: { type: String, default: '' },
  dish_name: { type: String, default: '' },
})

const emit = defineEmits(['goToDetail'])

// Task name: dish_name + task_type
const taskName = computed(() => {
  const parts = [props.dish_name, props.task_type].filter(Boolean)
  return parts.length > 0 ? parts.join('') : '未命名任务'
})

// Task status mapping: 1=进行中, 2=已完成, 3=逾期
function getTaskStatus(status) {
  const statusMap = {
    '1': { text: '进行中', badgeClass: 'bg-indigo-100', textClass: 'text-blue-700' },
    '2': { text: '已完成', badgeClass: 'bg-green-100', textClass: 'text-green-700' },
    '3': { text: '逾期', badgeClass: 'bg-red-100', textClass: 'text-red-700' }
  }
  return statusMap[status] || { text: '未知', badgeClass: 'bg-gray-100', textClass: 'text-gray-700' }
}

const taskStatus = computed(() => getTaskStatus(props.task_status))

// Task belong mapping: 1=品牌, 0=自己门店
const belongText = computed(() => {
  const belong = props.task_belong
  if (belong === '1') return '品牌任务'
  if (belong === '0') return '门店任务'
  return '任务'
})

// Format end time from timestamp to readable date
const formattedEndTime = computed(() => {
  if (!props.task_endtime || props.task_endtime === '') return '未设置'
  
  try {
    // Convert timestamp (milliseconds) to date
    const timestamp = Number(props.task_endtime)
    if (isNaN(timestamp)) return props.task_endtime
    
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return props.task_endtime
    
    // Format as YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    return props.task_endtime
  }
})

// Progress bar width
const progressWidth = computed(() => {
  const progress = parseFloat(props.task_progress) || 0
  const maxWidth = 398 // Total width of progress bar container
  const width = Math.min(Math.max(progress, 0), 100) / 100 * maxWidth
  return `${width}px`
})

function goToTaskDetail() {
  emit('goToDetail', props.task_id)
}
</script>

<style scoped>
</style>

