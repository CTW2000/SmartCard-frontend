<template>
   <section class="p-[25px]">
        <div class="min-w-[1500px]  min-h-[1100px] bg-background rounded-[50px] relative">
           
            <div class="left-[30px] top-[30px] absolute flex items-center gap-3">
              
                <img 
                    :src="arrowLeft" 
                    alt="Arrow Left" 
                    class="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                    @click="goToTaskCenter"
                />
                <span class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">任务详情</span>
            </div>

            <button
              type="button"
              class="w-35 h-13 right-[40px] top-[20px] absolute cursor-pointer"
              @click="cancelTask"
              :disabled="isCancelling"
            >
                <div class="w-full h-full left-0 top-0 absolute bg-slate-900 rounded-xl shadow-[0px_4px_4px_0px_rgba(168,168,168,0.25)] transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"></div>
                <div class="left-[29px] top-[12px] absolute justify-start text-white text-xl font-normal font-['Alibaba_PuHuiTi']">
                  {{ isCancelling ? '处理中...' : '任务作废' }}
                </div>
            </button>


            <div class="h-0 left-[40px] right-[40px] top-[80px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>

            <NewDishRecommend  
              :dish_name="taskInfo.dish_name"
              :task_type="taskInfo.task_type"
              :task_belong="taskInfo.task_belong"
              :task_status="taskInfo.task_status"
              :task_endtime="taskInfo.task_endtime"
              :task_progress="taskInfo.task_progress"
              :content="taskInfo.content"
              :createdAt="taskInfo.createdAt"
            />
            <StaffTaskComplete :task_id="task_id" />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'
import arrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import NewDishRecommend from '../components/TaskCenterComponents/NewDishRecommend.vue'
import StaffTaskComplete from '../components/TaskCenterComponents/StaffTaskComplete.vue'

const props = defineProps({
  task_id: { type: String, default: '' },
  taskInfo: {
    type: Object,
    default: () => ({
      task_id: '',
      task_type: '',
      task_belong: '',
      task_status: '',
      task_endtime: '',
      task_progress: '',
      dish_name: '',
      content: '',
      createdAt: ''
    })
  }
})
const router = useRouter()
const goToTaskCenter = () => {
  router.push({ name: 'TaskCenter' })
}

const isCancelling = ref(false)

async function cancelTask() {
  const targetTaskId = props.task_id || props.taskInfo.task_id
  if (!targetTaskId || isCancelling.value) return
  isCancelling.value = true
  try {
    await postForm(PATHS.TASK_UPDATE_STATUS, {
      task_id: targetTaskId,
      status: '0',
    })
    router.push({ name: 'TaskCenter' })
  } catch (error) {
    console.error('[SpecificTasks] Failed to cancel task:', error)
  } finally {
    isCancelling.value = false
  }
}
</script>
<style scoped>
</style>
