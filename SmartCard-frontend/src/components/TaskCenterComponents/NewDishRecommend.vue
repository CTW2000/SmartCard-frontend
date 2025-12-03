<template>

    
    <div class="h-[354px] relative mx-[40px] top-[100px]">
        <div class="w-full h-[354px] left-0 top-0 absolute bg-white rounded-[30px] shadow-[0px_2px_2px_0px_rgba(76,76,76,0.25)] border border-gray-200"></div>
        <div class="left-[35px] top-[32px] absolute justify-start text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] truncate max-w-[300px]">{{ props.dish_name || '新品推荐' }}</div>
        <div class="left-[35px] top-[132px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">类型：{{ props.task_type || '推荐' }}</div>
        <div class="left-[35px] top-[195px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">负责人：张三</div>
        <div class="left-[35px] top-[258px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">截止时间：{{ formatDate(props.task_endtime) || '2025-10-20' }}</div>
        <div class="left-[35px] top-[101px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">范围：{{ getBelongLabel(props.task_belong) || '门店任务' }}</div>
        <div class="left-[35px] top-[164px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">门店：武林门店</div>
        <div class="left-[35px] top-[227px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">创建时间：{{ formatDate(props.createdAt) || '2025-10-10' }}</div>
        <div class="left-[35px] top-[290px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">说明：{{ props.content || '在本周内完成新品推荐在门店的陈列与口播' }}</div>


        <div class="right-[315px] top-[101px] absolute justify-start text-stone-500 text-xl font-normal font-['Alibaba_PuHuiTi']">昨日完成情况</div>

        <div class="right-[400px] top-[164px] absolute justify-start text-neutral-900 text-xl font-normal font-['Alibaba_PuHuiTi']">{{ props.task_progress || 0 }}%</div>
        <div class="w-[398px] h-6 right-[35px] top-[132px] absolute bg-slate-100 rounded-2xl"></div>
        <div class="h-6 right-[200px] top-[132px] absolute bg-slate-900 rounded-tl-2xl rounded-bl-2xl" :style="{ width: `${(props.task_progress || 0) * 3.98}px` }"></div>

        <div class="w-21 h-8 left-[332px] top-[32px] absolute rounded-[15px]" :class="getStatusInfo(props.task_status).bgColor"></div>
        <div class="left-[350px] top-[37px] absolute justify-start text-base font-medium font-['Alibaba_PuHuiTi']" :class="getStatusInfo(props.task_status).textColor">{{ getStatusInfo(props.task_status).label }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
  dish_name: { type: String, default: '' },
  task_type: { type: String, default: '' },
  task_belong: { type: [String, Number], default: '' },
  task_status: { type: [String, Number], default: '' },
  task_endtime: { type: [String, Number], default: '' },
  task_progress: { type: [String, Number], default: 0 },
  content: { type: String, default: '' },
  createdAt: { type: String, default: '' }
})

// Helper function to format timestamp/ISO strings to date string
const formatDate = (input) => {
  if (!input && input !== 0) return ''

  let date = null

  if (input instanceof Date) {
    date = input
  } else if (typeof input === 'number') {
    const ms = input < 1e12 ? input * 1000 : input
    date = new Date(ms)
  } else if (typeof input === 'string') {
    const trimmed = input.trim()
    if (trimmed) {
      const numericValue = Number(trimmed)
      if (!Number.isNaN(numericValue)) {
        const ms = numericValue < 1e12 ? numericValue * 1000 : numericValue
        date = new Date(ms)
      } else {
        date = new Date(trimmed)
      }
    }
  }

  if (!date || Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

// Helper function to get belong label
const getBelongLabel = (belong) => {
  if (belong === 0 || belong === '0') return '门店任务'
  if (belong === 1 || belong === '1') return '品牌方任务'
  return ''
}

// Helper function to get status label and style
const getStatusInfo = (status) => {
  const statusNum = Number(status)
  if (statusNum === 1) return { label: '进行中', bgColor: 'bg-indigo-100', textColor: 'text-blue-700' }
  if (statusNum === 2) return { label: '已完成', bgColor: 'bg-green-100', textColor: 'text-green-700' }
  if (statusNum === 3) return { label: '已过期', bgColor: 'bg-red-100', textColor: 'text-red-700' }
  return { label: '未知', bgColor: 'bg-gray-100', textColor: 'text-gray-700' }
}
</script>

<style scoped>
</style>
