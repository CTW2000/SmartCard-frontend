<template>
    <section class="p-[25px]">
         <div class="min-w-[1500px]  min-h-[1000px] bg-background rounded-[50px] relative ">
          
            <div class="left-[30px] top-[30px] absolute flex items-center gap-3">
              
              <img 
                  :src="arrowLeft" 
                  alt="Arrow Left" 
                  class="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                  @click="goToHome"
              />
              <span class="text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">任务中心</span>
            </div>

           <div class="w-35 h-13 right-[40px] top-[40px] absolute cursor-pointer" @click="showCreateTaskPanel = true">
                <div class="w-full h-full left-0 top-0 absolute bg-slate-900 rounded-xl shadow-[0px_4px_4px_0px_rgba(168,168,168,0.25)] transition-opacity hover:opacity-90"></div>
                <div class="left-[25px] top-[12px] absolute justify-start text-white text-xl font-normal font-['Alibaba_PuHuiTi']">+新建任务</div>
            </div>


            <button
              class="left-[45px] top-[85px] absolute justify-start text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer transition-colors"
              :class="selectedBelong === null ? 'text-neutral-700 font-semibold' : 'text-neutral-500 hover:text-neutral-700'"
              @click="handleBelongFilter(null)"
            >
              全部
            </button>
            <button
              class="left-[125px] top-[85px] absolute justify-start text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer transition-colors"
              :class="selectedBelong === '1' ? 'text-neutral-700 font-semibold' : 'text-neutral-500 hover:text-neutral-700'"
              @click="handleBelongFilter('1')"
            >
              品牌方
            </button>
            <button
              class="left-[225px] top-[85px] absolute justify-start text-xl font-normal font-['Alibaba_PuHuiTi'] cursor-pointer transition-colors"
              :class="selectedBelong === '0' ? 'text-neutral-700 font-semibold' : 'text-neutral-500 hover:text-neutral-700'"
              @click="handleBelongFilter('0')"
            >
              门店
            </button>
            <div class="h-0 left-[40px] right-[40px] top-[120px] absolute outline outline-2 outline-offset-[-1px] outline-zinc-300"></div>


            <button
              class="w-32 h-11 left-[40px] top-[150px] absolute rounded-3xl shadow-[0px_4px_4px_0px_rgba(199,199,199,0.25)] border transition-colors cursor-pointer"
              :class="selectedStatus === '1' ? 'bg-neutral-700 border-white' : 'bg-white border-stone-300 hover:bg-neutral-50'"
              @click="handleStatusFilter('1')"
            >
              <div class="left-[35px] top-[8px] absolute justify-start text-xl font-normal font-['Alibaba_PuHuiTi']"
                   :class="selectedStatus === '1' ? 'text-white' : 'text-neutral-800'">
                进行中
              </div>
            </button>

            <button
              class="w-32 h-11 left-[200px] top-[150px] absolute rounded-3xl shadow-[0px_4px_4px_0px_rgba(199,199,199,0.25)] border transition-colors cursor-pointer"
              :class="selectedStatus === '2,3' ? 'bg-neutral-700 border-white' : 'bg-white border-stone-300 hover:bg-neutral-50'"
              @click="handleStatusFilter('2,3')"
            >
              <div class="left-[25px] top-[8px] absolute justify-start text-xl font-normal font-['Alibaba_PuHuiTi']"
                   :class="selectedStatus === '2,3' ? 'text-white' : 'text-neutral-800'">
                历史任务
              </div>
            </button>


           <div class="left-[40px] right-[40px] top-[220px] bottom-[100px] absolute">
             <div
               v-if="!isNoTaskPanel"
               class="w-full h-full flex flex-wrap gap-8 items-start"
             >
               <TaskCard
                 v-for="task in fetchTaskData.tasks"
                 :key="task.task_id"
                 :task_id="task.task_id"
                 :task_type="task.task_type"
                 :task_belong="task.task_belong"
                 :task_status="task.task_status"
                 :task_endtime="task.task_endtime"
                 :task_progress="task.task_progress"
                 :dish_name="task.dish_name"
                 @goToDetail="handleGoToDetail"
                 @statusUpdated="handleTaskStatusUpdated"
               />
             </div>
             <div
               v-else
               class="w-full h-full flex items-center justify-center"
             >
               <div class="justify-start text-stone-900 text-3xl font-medium font-['Alibaba_PuHuiTi']">
                 目前暂无任务
               </div>
             </div>
           </div>



            
            <!-- Task pagination controls -->
            <div class="left-[40px] right-[40px] bottom-[40px] absolute flex items-center justify-center gap-4">
              <button
                type="button"
                class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="taskPage <= 1"
                @click="prevTaskPage"
              >
                上一页
              </button>
              <span class="text-neutral-600 text-[14px] font-medium">
                第{{ taskPage }}页
              </span>
              <button
                type="button"
                class="px-4 py-2 rounded-[8px] border border-[#DADADA] text-[14px] bg-white text-[rgba(0,0,0,0.80)] hover:bg-[#F4F4F4] disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="taskTotal != null && taskPage >= Math.ceil(taskTotal / taskPageSize)"
                @click="nextTaskPage"
              >
                下一页
              </button>
            </div>

            <CreateNewTask
              v-if="showCreateTaskPanel"
              @close="showCreateTaskPanel = false"
              @submit="handleTaskSubmit"
              :task_type="fetchTaskData.taskTypes"
            />
        </div>
     </section>
 </template>
 
<script setup>
import { ref, reactive, onMounted } from 'vue'
import arrowLeft from '../../Resource/Menu/ArrowLeft.svg'
import { useRouter } from 'vue-router'
import TaskCard from '../components/TaskCenterComponents/TaskCard.vue'
import CreateNewTask from '../components/TaskCenterComponents/CreateNewTask.vue'
import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'

const showCreateTaskPanel = ref(false)

const taskPage = ref(1)
const taskPageSize = ref(6)
const taskTotal = ref(0)
const selectedBelong = ref(null) // null = 全部, '1' = 品牌方, '0' = 门店
const selectedStatus = ref('1') // '1' = 进行中, '2,3' = 历史任务
const isNoTaskPanel = ref(false)


const fetchTaskData = reactive({
  tasks:[],
  taskTypes: [],
})



// Synchronous helper function to translate task type value to label
function getTaskTypeLabel(value) {
  if (value === null || value === undefined || value === '') return ''
  const taskType = fetchTaskData.taskTypes.find(type => type.value === Number(value))
  return taskType ? taskType.label : ''
}

// Fetch task types from API
async function getTaskType() {
  try {
    const res = await postForm(PATHS.TASK_TYPE_LIST, {})
    if (res && res.status >= 200 && res.status < 300) {
      const responseData = res.data || {}
      const data = responseData.data || []
      // Store the task types array in fetchTaskData
      fetchTaskData.taskTypes = Array.isArray(data) ? data : []
      return fetchTaskData.taskTypes
    }
    return null
  } catch (error) {
    console.error('[TaskCenter] Failed to fetch task types:', error)
    return null
  }
}

async function fetchTaskList(page = taskPage.value, size = taskPageSize.value, status = null, belong = null) {
  const payload = {
    page: String(page),
    size: String(size),
    status: status || selectedStatus.value || '1',
    belong: belong !== null ? String(belong) : (selectedBelong.value !== null ? String(selectedBelong.value) : '')
  }

  try {
    // Always fetch task types first
    await getTaskType()
    
    const res = await postForm(PATHS.TASK_LIST, payload)
    if (res && res.status >= 200 && res.status < 300) {
      const responseData = res.data || {}
      const data = responseData.data || {}
      const taskList = Array.isArray(data.task_list) ? data.task_list : []

      // Clear existing tasks before adding new ones
      fetchTaskData.tasks = []
      
      for (const task of taskList) {
        const taskInfo = {
          task_id: task._id || '',
          task_type: getTaskTypeLabel(task.label_value) || '',
          task_belong: task.belong || '',
          task_status: task.status || '',
          task_endtime: task.end_time || '',
          task_progress: task.progress || '',
          dish_name: task.dish_name || '',
          content: task.content || '',
          createdAt: task.createdAt || '',
        }
        fetchTaskData.tasks.push(taskInfo)
      }

      // Update empty state flag
      isNoTaskPanel.value = fetchTaskData.tasks.length === 0

      const tasksTotal = data.total
      if (typeof tasksTotal === 'number' && tasksTotal >= 0) {
        taskTotal.value = tasksTotal
      }
      taskPage.value = page != null ? page : taskPage.value
    }


  } catch (error) {
    console.error('[TaskCenter] Failed to fetch task list:', error)
  }
  return null
}

function handleStatusFilter(status) {
  selectedStatus.value = status
  taskPage.value = 1
  fetchTaskList(1, taskPageSize.value, status, selectedBelong.value)
}

function handleBelongFilter(belong) {
  selectedBelong.value = belong
  taskPage.value = 1
  fetchTaskList(1, taskPageSize.value, selectedStatus.value, belong)
}

function prevTaskPage() {
  if (taskPage.value <= 1) return
  const prev = Math.max(1, taskPage.value - 1)
  fetchTaskList(prev, taskPageSize.value, selectedStatus.value, selectedBelong.value)
}

function nextTaskPage() {
  const totalPages = taskTotal.value != null && taskPageSize.value > 0 ? Math.max(1, Math.ceil(taskTotal.value / taskPageSize.value)) : null
  if (totalPages != null && taskPage.value >= totalPages) return
  const next = taskPage.value + 1
  fetchTaskList(next, taskPageSize.value, selectedStatus.value, selectedBelong.value)
}

function handleTaskSubmit() {
  fetchTaskList(taskPage.value, taskPageSize.value, selectedStatus.value, selectedBelong.value)
  showCreateTaskPanel.value = false
}

function handleTaskStatusUpdated() {
  fetchTaskList(taskPage.value, taskPageSize.value, selectedStatus.value, selectedBelong.value)
}

function handleGoToDetail(taskId) {
  if (!taskId) return
  // Find the task data from current list
  const taskData = Array.isArray(fetchTaskData.tasks)
    ? fetchTaskData.tasks.find(t => t.task_id === taskId)
    : null

  const query = {}
  
  if (taskData) {
    try {
      query.taskInfo = encodeURIComponent(JSON.stringify(taskData))
    } catch (error) {
      console.warn('[TaskCenter] Failed to serialize task info', error)
    }
  }

  router.push({
    name: 'SpecificTasks',
    params: { task_id: taskId },
    query
  })
}





onMounted(() => {
 fetchTaskList(1, taskPageSize.value, selectedStatus.value, selectedBelong.value)
})
const router = useRouter()
const goToHome = () => {
  router.push({ name: 'Home' })
}
</script>
 
 <style scoped>
 </style>
 
 
 