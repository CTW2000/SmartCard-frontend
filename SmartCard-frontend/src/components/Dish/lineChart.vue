<template>
  <div ref="containerRef" class="relative w-full min-w-[650px] h-[353px]">
    <div class="w-full h-full left-0 top-0 absolute rounded-[29px] border border-border bg-card shadow-md"></div>
    <div class="left-[35px] top-[23px] absolute justify-start text-neutral-700 text-[23px] font-bold font-['Alibaba_PuHuiTi']">投流转化次数</div>
    <div data-type="Indicator" class="w-[3px] h-[3px] p-[3px] left-[35px] top-[68px] absolute bg-cyan-950 rounded-xl"></div>
    <div class="left-[41px] top-[64px] absolute justify-start text-neutral-700 text-[9px] font-normal font-['Nunito']">抖音</div>
    <div data-type="Indicator" class="w-[3px] h-[3px] p-[3px] left-[68px] top-[68px] absolute bg-red-700 rounded-xl"></div>
    <div data-type="Indicator" class="w-[3px] h-[3px] p-[3px] left-[118px] top-[68px] absolute bg-yellow-400 rounded-xl"></div>
    <div class="left-[74px] top-[64px] absolute justify-start text-neutral-700 text-[9px] font-normal font-['Nunito']">大众点评</div>
    <div class="left-[124px] top-[64px] absolute justify-start text-neutral-700 text-[9px] font-normal font-['Nunito']">美团</div>

    <!-- chart grid + lines overlay -->
    <svg
      class="absolute"
      :style="{ left: `${chartLeft}px`, top: '88px', width: `${chartWidth}px` }"
      :viewBox="`0 0 ${chartWidth} ${H}`"
      :width="chartWidth"
      :height="H"
      preserveAspectRatio="none"
    >
      <!-- gridlines: all dotted -->
      <g stroke="rgba(17,24,39,0.6)" stroke-width="0.75" stroke-dasharray="1.5 3">
        <line v-for="y in gridYsTop" :key="'g-'+y" :x1="0" :x2="chartWidth" :y1="y" :y2="y" />
        <line :x1="0" :x2="chartWidth" :y1="H" :y2="H" stroke-dasharray="1.5 3" />
      </g>

      <!-- smooth curves -->
      <path :d="smoothPathDy" fill="none" stroke="#083344" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
      <path :d="smoothPathDzp" fill="none" stroke="#b91c1c" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
      <path :d="smoothPathMt" fill="none" stroke="#facc15" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <!-- month labels -->
    <div
      v-for="(month, index) in months"
      :key="month"
      class="absolute top-[306px] justify-start text-neutral-700 text-[11px] font-normal font-['Nunito']"
      :style="{ left: `${monthLabelBase + monthLabelPositions[index]}px` }"
    >
      {{ month }}
    </div>

    <!-- y-axis labels -->
    <div class="left-[37px] top-[89px] absolute justify-start text-neutral-400 text-[8px] font-bold font-['Alibaba_PuHuiTi']">1w</div>
    <div class="left-[38px] top-[139px] absolute justify-start text-neutral-400 text-[8px] font-bold font-['Alibaba_PuHuiTi']">5000</div>
    <div class="left-[38px] top-[191px] absolute justify-start text-neutral-400 text-[8px] font-bold font-['Alibaba_PuHuiTi']">3000</div>
    <div class="left-[38px] top-[242px] absolute justify-start text-neutral-400 text-[8px] font-bold font-['Alibaba_PuHuiTi']">1000</div>
    <div class="left-[38px] top-[292px] absolute justify-start text-neutral-400 text-[8px] font-bold font-['Alibaba_PuHuiTi']">0（次）</div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

// layout + sizing (25% smaller)
const H = 204
const baseW = 570
const chartLeft = 38
const monthLabelBase = 35
const rightPadding = 40

const containerRef = ref(null)
const chartWidth = ref(baseW)

// demo series data (12 months)
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const dy = [600, 1200, 2600, 1800, 900, 800, 1800, 5200, 3600, 2300, 1500, 1600]
const dzp = [5000, 2600, 2400, 3200, 1500, 2200, 3400, 4800, 600, 2700, 2400, 3000]
const mt = [1800, 3200, 3000, 1700, 900, 1000, 1200, 3000, 3200, 3600, 3400, 3100]

// scale helpers
const maxY = Math.max(...dy, ...dzp, ...mt, 5200)
const yAt = (v) => H - (v / maxY) * H
const xAt = (i) => (i / (months.length - 1)) * chartWidth.value

// grid lines positions (top 4)
const gridYsTop = computed(() => [0, H * 0.25, H * 0.5, H * 0.75])

// month label positions reactive to width
const monthLabelPositions = computed(() => months.map((_, i) => xAt(i)))

// responsive width handling
function updateChartWidth() {
  if (!containerRef.value) return
  const containerWidth = containerRef.value.offsetWidth
  chartWidth.value = Math.max(baseW, containerWidth - chartLeft - rightPadding)
}

let resizeObserver = null

onMounted(() => {
  updateChartWidth()

  if (window.ResizeObserver && containerRef.value) {
    resizeObserver = new ResizeObserver(() => updateChartWidth())
    resizeObserver.observe(containerRef.value)
  } else {
    window.addEventListener('resize', updateChartWidth)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  } else {
    window.removeEventListener('resize', updateChartWidth)
  }
})

// Catmull–Rom to Bezier smoothing (slightly stronger tension for smoother curves)
function smoothPath(arr) {
  const pts = arr.map((v, i) => [xAt(i), yAt(v)])
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const t = 0.48
    const cp1x = p1[0] + (p2[0] - p0[0]) * t / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) * t / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) * t / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) * t / 6
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  return d
}

const smoothPathDy = computed(() => smoothPath(dy))
const smoothPathDzp = computed(() => smoothPath(dzp))
const smoothPathMt = computed(() => smoothPath(mt))
</script>

<style scoped>
</style>