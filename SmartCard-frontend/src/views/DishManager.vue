<template>
  <section class="page">
    <div class="scaled">
    <div ref="topRowEl" class="flex items-start gap-[20px]">
      <div ref="chartWrap" class="origin-top-left flex-none">
        <LineChart :scale="sharedScale" />
      </div>
      <div class="origin-top-left flex-none">
        <BadDishMenu :scale="sharedScale" />
      </div>
      <div ref="controlsContainer" class="relative" :style="{ width: `${CONTROLS_BASE_W * sharedScale}px`, height: `${CONTROLS_BASE_H * sharedScale}px` }">
        <div class="absolute left-0 top-0" :style="{ width: `${CONTROLS_BASE_W}px`, height: `${CONTROLS_BASE_H}px`, transform: `scale(${sharedScale})`, transformOrigin: 'top left' }">
          <div class="w-[66px] h-[261px] absolute" :style="{ top: buttonsTop + 'px', left: buttonsLeft + 'px' }">
            <div class="w-[66px] h-[66px] left-0 top-0 absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="opacity-50 text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">日</span>
            </div>
            <div class="w-[66px] h-[66px] left-0 top-[97.5px] absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">周</span>
            </div>
            <div class="w-[66px] h-[66px] left-0 top-[195px] absolute bg-white rounded-full border border-gray-200 flex items-center justify-center">
            <span class="opacity-50 text-neutral-500 text-2xl font-normal font-['Alibaba_PuHuiTi']">月</span>
            </div>
          </div>
          <div class="w-40 h-36 absolute left-0 cursor-pointer" :style="{ bottom: '0px' }" @click="goMenuDetail">
            <div class="w-40 h-36 left-0 top-0 absolute bg-white rounded-3xl border border-gray-200"></div>
            <div class="left-[40px] top-[94px] absolute justify-start text-black text-xl font-normal font-['Alibaba_PuHuiTi']">菜单详情</div>
            <div class="w-11 h-11 left-[57px] top-[30px] absolute bg-white rounded-full border border-gray-200"></div>
            <img :src="ThreeGang" alt="menu" class="w-6 h-6 left-[67px] top-[40px] absolute object-contain" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 w-full flex items-start gap-[20px]">
      <div class="flex-1 min-w-0">
        <DishRank />
      </div>
      <div class="flex-1 min-w-0">
        <DishRank type="new" />
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import LineChart from '../components/lineChartMenu.vue'
import BadDishMenu from '../components/badDishMenu.vue'
import DishRank from '../components/DishRank.vue'
import ThreeGang from '../../Resource/Menu/ThreeGang.svg'
export default {
  name: 'DishManager',
  components: {
    LineChart,
    BadDishMenu,
    DishRank
  },
  data() {
    return {
      sharedScale: 1,
      __rowRO: null,
      ThreeGang
    }
  },
  computed: {
    CONTROLS_BASE_W() { return 200 },
    CONTROLS_BASE_H() { return 471 },
    BUTTONS_BLOCK_H() { return 261 },
    BOTTOM_CARD_H() { return 144 },
    GAP_BTNS_CARD() { return 8 },
    BUTTONS_W() { return 66 },
    CONTROLS_CARD_W() { return 160 },
    buttonsTop() {
      const remaining = this.CONTROLS_BASE_H - this.BOTTOM_CARD_H - this.GAP_BTNS_CARD
      const top = Math.max(0, Math.round((remaining - this.BUTTONS_BLOCK_H) / 2))
      return top
    },
    buttonsLeft() {
      const left = Math.max(0, Math.round((this.CONTROLS_CARD_W - this.BUTTONS_W) / 2))
      return left
    }
  },
  mounted() {
    const update = () => {
      const row = this.$refs && this.$refs.topRowEl
      const width = (row && row.clientWidth) || 1427
      const totalBase = 867 + 320 + this.CONTROLS_BASE_W + 40
      const next = width / totalBase
      this.sharedScale = Math.max(0.5, Math.min(2, next))
    }
    this.__rowRO = new ResizeObserver(update)
    if (this.$refs && this.$refs.topRowEl) this.__rowRO.observe(this.$refs.topRowEl)
    update()
  },
  beforeUnmount() {
    if (this.__rowRO && this.$refs && this.$refs.topRowEl) this.__rowRO.unobserve(this.$refs.topRowEl)
    this.__rowRO = null
  },
  methods: {
    goMenuDetail() {
      try {
        this.$router && this.$router.push && this.$router.push({ name: 'MenuDetail' })
      } catch (_) {
        // ignore navigation errors
      }
    }
  }
}
</script>

<style scoped>
.page {
  padding: 16px;
}
.scaled {
  transform: scale(1);
  transform-origin: top left;
}
</style>