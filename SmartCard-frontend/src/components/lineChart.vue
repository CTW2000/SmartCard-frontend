<template>
  <div class="rounded-[24px] bg-card p-[28px]" style="box-shadow: 0 8px 24px rgba(16,24,40,0.12)">
    <div class="flex items-start justify-between mb-4 gap-4">
      <h3 class="m-0 text-[28px] font-extrabold tracking-[-0.02em] text-foreground">投流转化次数</h3>
      <ul class="m-0 p-0 list-none flex items-center gap-5 text-[16px] font-bold text-muted-foreground">
        <li class="flex items-center gap-2"><span class="inline-block w-2 h-2 rounded-full bg-[#0f3b46] ring-2" style="--tw-ring-color: rgba(0,0,0,0.15)"></span> 抖音</li>
        <li class="flex items-center gap-2"><span class="inline-block w-2 h-2 rounded-full" style="background: #8b1f25; box-shadow: 0 0 0 2px rgba(0,0,0,0.15) inset"></span> 大众点评</li>
        <li class="flex items-center gap-2"><span class="inline-block w-2 h-2 rounded-full" style="background: #d4af00; box-shadow: 0 0 0 2px rgba(0,0,0,0.15) inset"></span> 美团</li>
      </ul>
    </div>

    <div ref="wrap" class="relative w-full">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="w-full h-[225px]"
        @mousemove="onMove"
        @mouseleave="hoverX = -1"
      >
        <!-- horizontal dashed gridlines -->
        <g :transform="`translate(0,0)`" stroke="rgba(0,0,0,0.22)" stroke-width="2" stroke-dasharray="12 10">
          <line v-for="y in ticksY" :key="y" :x1="m.l" :x2="m.l + innerW" :y1="y" :y2="y" />
        </g>
        <!-- vertical hover band -->
        <rect v-if="hoverX >= 0" :x="xAt(hoverIndex) - 10" :y="m.t" width="20" :height="innerH" fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.18)" stroke-width="2" />

        <!-- smoothed lines -->
        <path :d="smoothPath(dy)" fill="none" class="line-dy" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round" stroke-linejoin="round" />
        <path :d="smoothPath(dzp)" fill="none" class="line-red" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path :d="smoothPath(mt)" fill="none" class="line-yellow" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />

        <!-- markers on hover -->
        <g v-if="hoverX >= 0">
          <g :transform="`translate(${xAt(hoverIndex)}, ${yAt(dy[hoverIndex])})`">
            <circle r="8" fill="#ffffff" stroke="#0f3b46" stroke-width="2" style="filter: drop-shadow(0 4px 10px rgba(16,24,40,0.25))" />
            <circle r="4" fill="#0f3b46" />
          </g>
          <g :transform="`translate(${xAt(hoverIndex)}, ${yAt(dzp[hoverIndex])})`">
            <circle r="8" fill="#ffffff" stroke="#8b1f25" stroke-width="2" style="filter: drop-shadow(0 4px 10px rgba(16,24,40,0.25))" />
            <circle r="4" fill="#8b1f25" />
          </g>
          <g :transform="`translate(${xAt(hoverIndex)}, ${yAt(mt[hoverIndex])})`">
            <circle r="8" fill="#ffffff" stroke="#d4af00" stroke-width="2" style="filter: drop-shadow(0 4px 10px rgba(16,24,40,0.25))" />
            <circle r="4" fill="#d4af00" />
          </g>
        </g>

        <!-- x axis labels -->
        <g class="text-[14px] font-medium fill-[rgba(15,23,42,0.45)]">
          <text v-for="(mth, i) in months" :key="mth" :x="xAt(i)" :y="H - 16" text-anchor="middle">{{ mth }}</text>
        </g>
      </svg>

      <!-- tooltip -->
      <div v-if="hoverX >= 0" class="absolute -translate-x-1/2 -translate-y-full text-[12px] rounded-[12px]" :style="{ left: tooltipLeft + 'px', top: '40px', background: '#ffffff', color: '#0f172a', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', border: '1px solid rgba(0,0,0,0.08)', padding: '10px 12px' }">
        <div class="opacity-90 font-semibold">{{ months[hoverIndex] }}</div>
        <div class="font-bold">抖音 {{ dy[hoverIndex] }} · 大众 {{ dzp[hoverIndex] }} · 美团 {{ mt[hoverIndex] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// canvas size and margins
const W = 720
const H = 225
const m = { l: 48, r: 18, t: 18, b: 36 }
const innerW = W - m.l - m.r
const innerH = H - m.t - m.b

// demo data (12 months)
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
// 抖音（深绿虚线）
const dy = [600, 1200, 2600, 1800, 900, 800, 1800, 5200, 3600, 2300, 1500, 1600]
// 大众点评（红色）
const dzp = [5000, 2600, 2400, 3200, 1500, 2200, 3400, 4800, 600, 2700, 2400, 3000]
// 美团（黄）
const mt = [1800, 3200, 3000, 1700, 900, 1000, 1200, 3000, 3200, 3600, 3400, 3100]

// scales
const maxY = Math.max(...dy, ...dzp, ...mt, 5200)
const yAt = (v) => m.t + innerH - (v / maxY) * innerH
const xAt = (i) => m.l + (i / (months.length - 1)) * innerW
const points = (arr) => arr.map((v, i) => `${xAt(i)},${yAt(v)}`).join(' ')

// smooth path (Catmull-Rom to Bezier approximation)
function smoothPath(arr) {
  const pts = arr.map((v, i) => [xAt(i), yAt(v)])
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const t = 0.32 // tension from design.json
    const cp1x = p1[0] + (p2[0] - p0[0]) * t / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) * t / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) * t / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) * t / 6
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  return d
}

// gridlines (5 levels + top)
const ticksY = computed(() => {
  const levels = [1, 0.8, 0.6, 0.4, 0.2]
  return levels.map((p) => m.t + innerH - p * innerH)
})

// hover state
const wrap = ref(null)
const hoverX = ref(-1)
const hoverIndex = computed(() => {
  if (hoverX.value < 0) return 0
  const rectW = wrap.value?.getBoundingClientRect().width || innerW
  const pxPerStep = rectW / (months.length - 1)
  const i = Math.round(hoverX.value / pxPerStep)
  return Math.min(Math.max(i, 0), months.length - 1)
})
const tooltipLeft = computed(() => {
  const rect = wrap.value?.getBoundingClientRect()
  if (!rect) return 0
  return (hoverX.value / (rect.width || 1)) * rect.width
})
function onMove(e) {
  const rect = wrap.value?.getBoundingClientRect()
  if (!rect) return
  hoverX.value = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
}
</script>

<style scoped>
.line-red { stroke: var(--color-primary); filter: drop-shadow(0 2px 0 rgba(0,0,0,0.04)); }
.line-yellow { stroke: var(--color-chart-1); }
.line-dy { stroke: #0f4c5c; }
.marker-red { fill: var(--color-primary); stroke: white; stroke-width: 2; }
.marker-yellow { fill: var(--color-chart-1); stroke: white; stroke-width: 2; }
.marker-dy { fill: #0f4c5c; stroke: white; stroke-width: 2; }
</style>


