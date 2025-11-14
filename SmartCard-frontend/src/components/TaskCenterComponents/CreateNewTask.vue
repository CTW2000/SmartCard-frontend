<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      @click="emit('close')"
    ></div>

      <div class="relative h-[444.75px] w-[605.25px]">
        <div class="absolute left-0 top-0 h-[389.25px] w-[605.25px] rounded-[31px] bg-white"></div>
        <div class="absolute left-[45px] top-[31.5px] justify-start text-[18px] font-medium text-neutral-800 font-['Alibaba_PuHuiTi']">新建任务</div>
        <div class="absolute left-[45px] top-[76.5px] h-[1.5px] w-[516px] rounded-[73px] bg-gray-200"></div>
        <div class="absolute left-[45px] top-[195px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">任务描述</div>
        <div class="absolute left-[45px] top-[110.25px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">任务类型</div>
        <div class="absolute left-[319.5px] top-[110.25px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">菜品名字</div>
        <div class="absolute left-[45.75px] top-[321.75px] justify-start text-[18px] font-normal text-neutral-950 font-['Alibaba_PuHuiTi']">截止时间</div>
        <div class="absolute left-[143.25px] top-[179.25px] h-[108px] w-[417.75px] rounded-xl border border-zinc-300 shadow-[0px_1px_2px_0px_rgba(150,150,150,0.25)]"></div>
        <div class="absolute left-[252px] top-[321.75px] h-[36px] w-[108px] rounded-xl border border-neutral-300 bg-slate-50"></div>
        <div class="absolute left-[273.75px] top-[329.25px] justify-start text-[15px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi']">选择日期</div>
        <div class="absolute left-[163.5px] top-[197.25px] justify-start text-[15px] font-normal text-zinc-800 opacity-50 font-['Alibaba_PuHuiTi']">请输入您想要创建的任务内容</div>
        <div class="absolute left-[143.25px] top-[93.75px] h-[60px] w-[156px] rounded-2xl border border-stone-300 bg-white"></div>
        
        
       
        <div class="absolute left-[168px] top-[110.25px] flex items-center gap-2">
          <span class="text-[18px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi']">{{ editData.task_type || '菜品推广' }}</span>
          <img
            :src="triangleIcon"
            alt=""
            class="w-[18px] h-[16px] cursor-pointer hover:opacity-80 transition-opacity"
            @click="toggleTaskTypePanel"
          >
        </div>


        
        <div class="absolute left-[410.25px] top-[93.75px] h-[60px] w-[156px] rounded-2xl border border-stone-300 bg-white flex items-center gap-1 px-3">
          <input
            v-model="editData.dish_name"
            type="text"
            class="w-full bg-transparent border-none outline-none text-[18px] font-normal text-zinc-800 font-['Alibaba_PuHuiTi'] border-r border-stone-300 pr-2"
            placeholder="输入菜品"
            @keyup.enter="handleDishSearch"
          />
          <img :src="triangleIcon" alt="" class="w-[18px] h-[16px] cursor-pointer hover:opacity-80 transition-opacity" @click="toggleDishPanel">
        </div>
        

        <!-- Task Type Panel -->
        <div v-if="showTaskTypePanel" class="absolute left-[143.25px] top-[160px] w-52 h-52 relative z-10">
          <div class="w-52 h-52 bg-white rounded-2xl border border-stone-300 overflow-hidden flex flex-col">
            <div class="flex-1 overflow-y-auto px-8 py-4">
              <div
                v-for="task in props.task_type"
                :key="task.id"
                class="flex items-center justify-center min-h-[65px] border-b border-stone-300 last:border-b-0 cursor-pointer hover:bg-stone-50 transition-colors"
                @click="handleTaskTypeSelect(task)"
              >
                <div class="text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
                  {{ task.label }}
                </div>
              </div>
              <div v-if="props.task_type.length === 0" class="flex items-center justify-center min-h-[65px] text-zinc-400 text-lg">
                暂无任务类型
              </div>
            </div>
          </div>
        </div>

        <!-- Dropdown Panel -->
        <div v-if="showDishPanel" class="absolute left-[410.25px] top-[160px] w-52 h-52 relative z-10">
          <div class="w-52 h-52 bg-white rounded-2xl border border-stone-300 overflow-hidden flex flex-col">
            <div 
              class="flex-1 overflow-y-auto px-8 py-4"
              @scroll="handleScroll"
            >
              <div
                v-for="(dish, index) in fetchData.dish_name"
                :key="dish.id"
                class="flex items-center justify-center min-h-[65px] border-b border-stone-300 last:border-b-0 cursor-pointer hover:bg-stone-50 transition-colors"
                @click="handleDishSelect(dish)"
              >
                <div class="text-zinc-800 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center">
                  {{ dish.name }}
                </div>
              </div>
              <div v-if="isLoadingMore" class="flex items-center justify-center min-h-[65px]">
                <div class="text-zinc-500 text-lg font-normal font-['Alibaba_PuHuiTi']">加载中...</div>
              </div>
            </div>
          </div>
        </div>


    </div>
  </div>
</template>


<script setup>
import triangleIcon from '../../../Resource/Task/triangle.svg'
import { reactive, ref, computed } from 'vue'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

const emit = defineEmits(['close'])

const dishPage = ref(1)
const dishPageSize = ref(10)
const isLoadingMore = ref(false)
const hasMorePages = ref(true)
const currentDishQuery = ref('')

const props = defineProps({
  task_type: [],
})

const fetchData = reactive({
  dish_name: []
})


const editData = reactive({
     dish_id:'',
     dish_name:'',
     task_type_value:'',
     context:'',
     end_time:''
})

const showDishPanel = ref(false)
const showTaskTypePanel = ref(false)



function toggleDishPanel() {
  showDishPanel.value = !showDishPanel.value
  if (showDishPanel.value) {
    currentDishQuery.value = (editData.dish_name || '').trim()
    // Reset when opening panel
    dishPage.value = 1
    fetchData.dish_name = []
    hasMorePages.value = true
    fetchTheDishes()
  }
}

function toggleTaskTypePanel() {
  showTaskTypePanel.value = !showTaskTypePanel.value
  if (showTaskTypePanel.value) {
    showDishPanel.value = false
  }
}

async function fetchTheDishes() {
  if (isLoadingMore.value || !hasMorePages.value) return
  
  try {
    isLoadingMore.value = true
    const queryConditions = {}
    if (currentDishQuery.value) {
      queryConditions.dish_name = currentDishQuery.value
    }

    const payload = {
      query: JSON.stringify(queryConditions),
      page: String(dishPage.value),
      size: String(dishPageSize.value)
    }

    const res = await postForm(PATHS.DISH_LIST, payload)
    if (res && res.status >= 200 && res.status < 300) {
      const responseData = res.data || {}
      const data = responseData.data || {}
      const dishList = Array.isArray(data.dish_list) ? data.dish_list : []
      
      // Append new dishes to existing list
      const newDishes = dishList.map(dish => ({
        id: dish._id || '',
        name: dish.dish_name || ''
      }))
      
      fetchData.dish_name.push(...newDishes)
      
      // Check if there are more pages
      // If we got fewer items than requested, we've reached the end
      // Otherwise, check if total exists and compare
      if (data.total !== undefined) {
        const totalItems = data.total || 0
        const currentItems = fetchData.dish_name.length
        hasMorePages.value = currentItems < totalItems
      } else {
        // If no total field, assume more pages if we got a full page
        hasMorePages.value = dishList.length === dishPageSize.value
      }
      
      console.log('Fetched dishes:', newDishes.length, 'Total:', fetchData.dish_name.length)
    }
  } catch (error) {
    console.error('[CreateNewTask] Failed to fetch dishes:', error)
  } finally {
    isLoadingMore.value = false
  }
}

function handleScroll(event) {
  const container = event.target
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight
  
  // Load more when scrolled to bottom (within 50px)
  if (scrollTop + clientHeight >= scrollHeight - 50 && hasMorePages.value && !isLoadingMore.value) {
    dishPage.value++
    fetchTheDishes()
  }
}

function handleDishSelect(dish) {
  editData.dish_name = dish.name
  showDishPanel.value = false
}

function handleDishSearch() {
  currentDishQuery.value = (editData.dish_name || '').trim()
  dishPage.value = 1
  fetchData.dish_name = []
  hasMorePages.value = true
  if (!showDishPanel.value) {
    showDishPanel.value = true
  }
  fetchTheDishes()
}

function handleTaskTypeSelect(task) {
  editData.task_type_value = task.value
  showTaskTypePanel.value = false
}



</script>

