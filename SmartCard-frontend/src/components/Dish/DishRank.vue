<template>
  <form class="relative w-full h-[684px] rounded-[38px] bg-white shadow-[2px_2px_4px_0px_rgba(204,204,204,0.25)] p-[40px] flex flex-col">
    
    <!-- Title -->
    <div class="flex items-center">
      <template v-if="type === 'new'">
        <span class="text-teal-600 text-4xl font-bold font-['Alibaba_PuHuiTi']">新品</span>
        <span class="text-neutral-700 text-4xl font-bold font-['Alibaba_PuHuiTi']">榜</span>
      </template>
      <template v-else>
        <span class="text-teal-600 text-4xl font-bold font-['Alibaba_PuHuiTi']">招牌</span>
        <span class="text-neutral-700 text-4xl font-bold font-['Alibaba_PuHuiTi']">菜品榜</span>
      </template>

      <img
        :src="ArrowUpDown"
        alt="sort"
        class="ml-2 w-[30px] h-[30px]"
      />
    </div>

    <!-- Headers -->
    <div class="mt-6 grid items-center " :style="gridStyle">
      <div
        v-for="(header, idx) in headerLabels"
        :key="idx"
        class="text-stone-900 text-2xl font-normal font-['Alibaba_PuHuiTi'] text-center"
      >
        {{ header }}
      </div>
    </div>

    <div class="mt-3 h-0 shadow-[1px_1px_4px_0px_rgba(153,153,153,0.25)] outline outline-2 outline-offset-[-1px] outline-neutral-200"></div>

    <!-- Rows -->
    <div class="mt-4 flex-1 overflow-y-auto " @scroll="handleScroll">
      <div
        v-if="fetchDishRankData.length"
        class="space-y-13"
      >
        <div
          v-for="(dish, index) in fetchDishRankData"
          :key="dish.dish_name + index"
          class="grid items-center text-center "
          :style="gridStyle"
        >
          <span class="text-2xl font-semibold text-teal-600 ">
            {{ index + 1 }}
          </span>
          <span class="text-xl text-stone-900">
            {{ dish.dish_name || '—' }}
          </span>
          <span class="text-xl text-red-500 font-semibold">
            {{ dish.bad_count }}
          </span>
          <div class="flex justify-center">
            <button
              type="button"
              class="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-100 transition-colors"
              @click="openReport(dish)"
              aria-label="查看菜品差评详情"
            >
              <img :src="ArrowIcon" alt="详情" class="w-[22px] h-[22px]" />
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-6 text-neutral-400 text-center text-xl">
        暂无数据
      </div>
    </div>


  </form>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import ArrowUpDown from '../../../Resource/Menu/ArrowUpDown.svg'
import ArrowIcon from '../../../Resource/Staff/arrow.svg'

import { postForm } from '../../httpClient/client'
import { PATHS } from '../../httpClient/paths'


const props = defineProps({
  type: { type: String, default: 'top' },
})

const dishpage = ref(1)
const dishpagesize = ref(10)
const dishtotal = ref(0)

const fetchDishRankData = ref([])
const hasMorePages = ref(true)
const isLoadingMore = ref(false)

const emit = defineEmits(['open-report'])

const headerLabels = ['排名', '菜名', '差评数', '详情']

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${headerLabels.length}, minmax(50px, 1fr))`,
  columnGap: '24px',
}))

function openReport(item) {
  emit('open-report', item)
}

async function fetchDishRank(type = 'top') {
  // Prevent duplicate requests or loading when no more pages
  if (isLoadingMore.value || !hasMorePages.value) return

  isLoadingMore.value = true

  const payload = {
    page: String(dishpage.value),
    size: String(dishpagesize.value),
    type,
  }

  try {
    const res = await postForm(PATHS.DISH_RANK, payload)
    const data = res?.data?.data || {}

    const dishRankList = data.bad_dish_list || []
    const simplifiedList = dishRankList.map((item) => ({
      dish_name: item.dish_name || item.dish_id?.dish_name || '',
      bad_count: item.bad_count ?? 0,
    }))

    if (dishpage.value === 1) {
      // First page: replace data
      fetchDishRankData.value = simplifiedList
    } else {
      // Next pages: append data
      fetchDishRankData.value = [...fetchDishRankData.value, ...simplifiedList]
    }

    const total = data.total ?? 0
    dishtotal.value = total

    if (total > 0) {
      // Use total if backend provides it
      hasMorePages.value = fetchDishRankData.value.length < total
    } else {
      // Fallback: if we got a full page, assume there might be more
      hasMorePages.value = simplifiedList.length === dishpagesize.value
    }
  } catch (error) {
    console.error('Failed to fetch dish rank:', error)
  } finally {
    isLoadingMore.value = false
  }
}

function handleScroll(event) {
  const container = event.target
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  // Load more when scrolled near bottom (within 50px)
  if (
    scrollTop + clientHeight >= scrollHeight - 50 &&
    hasMorePages.value &&
    !isLoadingMore.value
  ) {
    dishpage.value++
    fetchDishRank(props.type)
  }
}

onMounted(() => {
  dishpage.value = 1
  hasMorePages.value = true
  fetchDishRank(props.type)
})


</script>

<style scoped>
</style>
