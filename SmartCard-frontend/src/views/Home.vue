<template>
  <section class="p-[25px]">

    
      <div class="grid grid-cols-4 gap-6">
        <ScoreCard title="本周店长评分" :value="fetchhomeData.manager_score + '分'" color="primary" metaLabel="同比上周" :metaValue="fetchhomeData.manager_score_ratio" :trend="trendOf(fetchhomeData.manager_score_ratio)" />
        <ScoreCard title="员工服务评分" :value="fetchhomeData.staff_score + '分'" color="primary" metaLabel="同比上周" :metaValue="fetchhomeData.staff_score_ratio" :trend="trendOf(fetchhomeData.staff_score_ratio)" />
        <ScoreCard title="菜品差评分" :value="fetchhomeData.dish_bad_score + '分'" color="accent" metaLabel="与上周相比" :metaValue="fetchhomeData.dish_bad_ratio" :trend="trendOf(fetchhomeData.dish_bad_ratio)" />
        <ScoreCard title="昨日预警分数" :value="fetchhomeData.warn_score + '分'" color="accent" metaLabel="与上周相比" :metaValue="fetchhomeData.warn_ratio" :trend="trendOf(fetchhomeData.warn_ratio)" />
      </div>


      <div class="mt-6 overflow-x-auto flex gap-6">
  
          <div class="flex-none w-[240px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <BadDish :badRank="fetchhomeData.bad_rank" />
            </div>
          </div>

          <div class="flex-none w-[557.25px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <TaskPanel :tasks="fetchhomeData.task_list" />
            </div>
          </div>

          <div class="flex-none w-[650.25px] h-[353.25px]">
            <div class="transform origin-top-left scale-75">
              <LineChart />
            </div>
          </div>
    
      </div>


      <div class="mt-6">
        <StaffFormHome/>
      </div>
   
  </section>
</template>

<script setup>

import { reactive, onMounted } from 'vue'

import ScoreCard from '../components/General/ScoreCard.vue'
import LineChart from '../components/Dish/lineChart.vue'
import StaffFormHome from '../components/Staff/StaffFormHome.vue'
import BadDish from '../components/Dish/badDishHome.vue'
import TaskPanel from '../components/TaskCenterComponents/TaskPanel.vue'

import { postForm } from '../httpClient/client'
import { PATHS } from '../httpClient/paths'


// Reactive data
const fetchhomeData = reactive({
  manager_score: 0,
  manager_score_ratio: 0,
  staff_score: 0,
  staff_score_ratio: 0,
  dish_bad_score: 0,
  dish_bad_ratio: 0,
  warn_ratio: 0,
  warn_score: 0,
  bad_rank: [],
  task_list: [],
})


const trendOf = (metaValue) => {
  if (metaValue === null || metaValue === undefined) return ''
  const s = String(metaValue).trim()
  if (s.startsWith('-')) return 'down'
  if (s.startsWith('+')) return 'up'
  const n = Number(s.replace('%', ''))
  if (!Number.isNaN(n)) return n < 0 ? 'down' : n > 0 ? 'up' : ''
  return ''
}


async function fetchHomeData() {
  try {
    const res = await postForm(PATHS.MANAGE_INDEX, { account: '', password: '' })
    
    if (res && res.status >= 200 && res.status < 300) {
      const data = res.data?.data
      
      if (data) {
        fetchhomeData.manager_score = data.manager_score ?? 0
        fetchhomeData.manager_score_ratio = data.manager_score_ratio ?? 0
        fetchhomeData.staff_score = data.staff_score ?? 0
        fetchhomeData.staff_score_ratio = data.staff_score_ratio ?? 0
        fetchhomeData.dish_bad_score = data.dish_bad_score ?? 0
        fetchhomeData.dish_bad_ratio = data.dish_bad_ratio ?? 0
        fetchhomeData.warn_ratio = data.warn_ratio ?? 0
        fetchhomeData.warn_score = data.warn_score ?? 0
        fetchhomeData.bad_rank = data.bad_dish_list || []
        fetchhomeData.task_list = data.task_list || []
      }
    }
  } catch (error) {
    console.error('Failed to fetch home data:', error)
  }
}


onMounted(() => {
  fetchHomeData()
})
</script>


<style scoped>
</style>
