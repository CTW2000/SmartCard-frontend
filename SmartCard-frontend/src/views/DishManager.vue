<template>
  <section class="p-[25px]">
    <div class="flex items-start gap-[50px]">
      <div class="flex-none">
        <LineChartMenu />
      </div>
      <div class="flex items-start gap-[32px] flex-none">
        <BadDishMenu />
      </div>
      <div class="flex flex-col items-center gap-[12px] flex-none">
          <button
            type="button"
            aria-label="day filter"
            class="flex flex-col items-center justify-center w-[60px] h-[60px] cursor-pointer"
          >
            <div
              class="flex items-center justify-center w-full h-full bg-white rounded-full border border-gray-200"
            >
              <span
                class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']"
              >
                日
              </span>
            </div>
          </button>

          <button
            type="button"
            aria-label="week filter"
            class="flex flex-col items-center justify-center w-[60px] h-[60px] cursor-pointer"
          >
            <div
              class="flex items-center justify-center w-full h-full bg-white rounded-full border border-gray-200"
            >
              <span
                class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']"
              >
                周
              </span>
            </div>
          </button>

          <button
            type="button"
            aria-label="month filter"
            class="flex flex-col items-center justify-center w-[60px] h-[60px] cursor-pointer"
          >
            <div
              class="flex items-center justify-center w-full h-full bg-white rounded-full border border-gray-200"
            >
              <span
                class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']"
              >
                月
              </span>
            </div>
          </button>

          <button
            type="button"
            aria-label="menu detail card"
            class="relative w-40 h-36 flex-none cursor-pointer"
            @click="goMenuDetail"
          >
          
            <div
              class="absolute inset-0 bg-white rounded-3xl border border-gray-200"
            ></div>
            <div
              class="left-[40px] top-[94px] absolute text-black text-xl font-normal font-['Alibaba_PuHuiTi']"
            >
              菜单详情
            </div>
            <div
              class="w-11 h-11 left-[57px] top-[30px] absolute bg-white rounded-full border border-gray-200"
            ></div>
            <div
              class="w-6 h-6 left-[67px] top-[40px] absolute overflow-hidden"
            >
              <img :src="ThreeGang" alt="menu icon" class="w-6 h-6" />
            </div>
          </button>
        </div>
    </div>



    <div class="mt-4 flex items-start gap-[20px]">
        <DishRank />
        
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import LineChartMenu from '../components/Dish/lineChartMenu.vue'
import BadDishMenu from '../components/Dish/badDishMenu.vue'
import DishRank from '../components/Dish/DishRank.vue'
import ThreeGang from '../../Resource/Menu/ThreeGang.svg'

const router = useRouter()

// Constants
const CONTROLS_BASE_H = 471
const BUTTONS_BLOCK_H = 261
const BOTTOM_CARD_H = 144
const GAP_BTNS_CARD = 8
const BUTTONS_W = 66
const CONTROLS_CARD_W = 160

// Computed properties
const buttonsTop = computed(() => {
  const remaining = CONTROLS_BASE_H - BOTTOM_CARD_H - GAP_BTNS_CARD
  const top = Math.max(0, Math.round((remaining - BUTTONS_BLOCK_H) / 2))
  return top
})

const buttonsLeft = computed(() => {
  const left = Math.max(0, Math.round((CONTROLS_CARD_W - BUTTONS_W) / 2))
  return left
})

// Methods
function goMenuDetail() {
  try {
    router.push({ name: 'MenuDetail' })
  } catch (_) {
   
  }
}
</script>

