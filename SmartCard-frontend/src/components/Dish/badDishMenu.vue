<template>
  <div class="relative w-full min-w-[230px] max-w-[330px] h-[355px] overflow-hidden">
    
    <div class="w-full h-[355px] left-0 top-0 absolute rounded-[25px] border border-border bg-card shadow-md"></div>
    <div class="left-[36px] top-[25px] absolute justify-start text-neutral-700 text-3xl font-bold font-['Alibaba_PuHuiTi']">菜品差评数</div>
   
    <div 
      class="absolute inset-0 overflow-y-auto overflow-x-hidden"
      style="top: 70px; bottom: 0;"
      @scroll="handleScroll"
    >
      <div 
        class="relative"
        :style="{ minHeight: badRank.length > 0 ? (dotTop(badRank.length - 1) + 50) + 'px' : '100%' }"
      >


        <template v-if="badRank.length > 0">
          <div
            v-for="(item, index) in badRank"
            :key="item._id || index"
            class="relative"
          >
            <!-- Item name -->
            <div
              class="left-[36px] absolute justify-start text-neutral-500 text-xl font-normal font-['Alibaba_PuHuiTi'] truncate  cursor-pointer hover:text-teal-600 transition-colors"
              :style="{ top: nameTop(index) + 'px', maxWidth: '320px' }"
              @click="openReport(item)"
            >
              {{ String(index + 1).padStart(2, '0') }}：{{ item.dish_name || '—' }}
            </div>
            
            <!-- Count -->
            <div
              class="left-[66px] absolute justify-start text-zinc-900 text-2xl font-medium font-['Alibaba_PuHuiTi'] truncate"
              :style="{ top: countTop(index) + 'px', maxWidth: '200px' }"
            >
              {{ item.bad_count || 0 }}（条）
            </div>
            
            <!-- Dot -->
            <div
              class="w-3.5 h-3.5 left-[36px] absolute rounded-full"
              :class="dotClass()"
              :style="{ top: dotTop(index) + 'px' }"
            ></div>
          </div>
        </template>



        <div v-else-if="!isLoadingMore" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-center text-xl">暂无数据</div>
        <div v-if="isLoadingMore" class="absolute left-1/2 bottom-4 transform -translate-x-1/2 text-gray-400 text-center text-lg">加载中...</div>
      
      
      
      </div>
    </div>

    <!-- Modal: Dish Report -->
    <div v-if="showReportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="closeReport">
      <div class="relative flex flex-col items-center">
        <DishReport :dish-name="selectedDish?.dish_name || ''" 
        :dish_id="selectedDish?.dish_id || ''" 
        @close="closeReport" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'

import DishReport from './DishReport.vue'

const dishPage = ref(1)
const dishPageSize = ref(10)


const badRank = reactive([])
const hasMorePages = ref(true)
const isLoadingMore = ref(false)

const showReportModal = ref(false)
const selectedDish = ref(null)

const nameTop = (index) => {
  const base = [20, 100, 180]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 80
}

const countTop = (index) => {
  const base = [50, 130, 210]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 80
}

const dotTop = (index) => {
  const base = [60, 140, 220]
  if (index < base.length) return base[index]
  return base[base.length - 1] + (index - (base.length - 1)) * 80
}

const dotClass = () => {
  return 'bg-teal-300'
}

function openReport(item) {
  selectedDish.value = item
  showReportModal.value = true
}

function closeReport() {
  showReportModal.value = false
  selectedDish.value = null
}

async function fetchbadDishRank() {
  
  if (isLoadingMore.value || !hasMorePages.value) return
  
  try {
    isLoadingMore.value = true
    const res = await postForm(PATHS.DISH_NAV_LIST, {
      page: String(dishPage.value),
      size: String(dishPageSize.value)
    })
    
    if (res?.data?.data?.bad_dish_list) {
      const badDishList = res.data.data.bad_dish_list
      const data = res.data.data
      
      // Append new data to existing list (only _id, dish_name, and bad_count)
      const newItems = badDishList.map(item => ({
        _id: item._id,
        dish_id: item.dish_id?._id || '',
        dish_name: item.dish_id?.dish_name || '',
        bad_count: item.bad_count
      }))
      
      if (dishPage.value === 1) {
        // First page: replace all data
        badRank.splice(0, badRank.length, ...newItems)
      } else {
        // Subsequent pages: append data
        badRank.push(...newItems)
      }
      
      // Check if there are more pages
      if (data.total !== undefined) {
        const totalItems = data.total || 0
        const currentItems = badRank.length
        hasMorePages.value = currentItems < totalItems
      } else {
        // If no total field, assume more pages if we got a full page
        hasMorePages.value = badDishList.length === dishPageSize.value
      }
    }
  } catch (error) {
    console.error('Failed to fetch bad dish rank:', error)
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
    fetchbadDishRank()
  }
}

onMounted(() => {
  fetchbadDishRank()
})



</script>


